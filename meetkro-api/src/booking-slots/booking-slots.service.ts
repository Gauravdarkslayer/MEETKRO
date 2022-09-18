import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailService } from 'src/helpers/services/mail.service';
import { MailDto } from 'src/core/interfaces/mailService.interface';
import { IPaginate } from 'src/helpers/interfaces/paginate.dto';
import { BookingSlotRepository } from './booking-slots.repository';
import * as moment from "moment";
import { UserService } from 'src/users/users.service';
import { BookingUserRepository } from './booking-users.repository';
import { IBookingSlot } from './dtos/booking-slots.dto';
import { BookingUserService } from './booking-users.service';
import { IScheduleMail } from './dtos/schedule-mail.dto';
import { config } from 'src/helpers/enums/config.enum';

@Injectable()
export class BookingSlotService {
  constructor(
    private readonly bookingSlotRepository: BookingSlotRepository,
    private readonly userService: UserService,
    private readonly bookingUserRepository: BookingUserRepository,
    private readonly bookingUserService: BookingUserService
  ) { }

  async find(condition): Promise<IBookingSlot[]> {
    return await this.bookingSlotRepository.getAll(condition);
  }

  async create(data) {
    //     slotEndDatetime: "2022-09-17T21:34"
    // slotInterval: 45
    // slotStartDatetime: "2022-09-17T19:35"
    // slotsAgenda: "Consultancy"
    console.log({ data })
    const endDate = moment(data.slotEndDatetime).utcOffset(0, true);
    const startDate = moment(data.slotStartDatetime).utcOffset(0, true);
    const minutes = endDate.diff(startDate, 'minutes')
    const numberOfIntervals = Math.ceil(minutes / data.slotInterval);
    let cleanStartDateTime;
    for (let index = 0; index < numberOfIntervals; index++) {
      let bookingSlotData = {
        start_time: cleanStartDateTime || startDate,
        end_time: cleanStartDateTime ? moment(cleanStartDateTime).utcOffset(0, true).add(data.slotInterval, 'minutes') : moment(startDate).utcOffset(0, true).add(data.slotInterval, 'minutes'),
        agenda: data.slotsAgenda,
        max_members: data.max_members,
        meeting_id: data.meeting_id
      };
      // startDate = endDate.add(minutes, 'minutes')
      await this.bookingSlotRepository.create(bookingSlotData);
      cleanStartDateTime = bookingSlotData.end_time;
    }

    return {
      statusCode: HttpStatus.OK,
    }

  }


  async findOne(condition) {
    return this.bookingSlotRepository.findOne(condition);
  }

  async deleteOne(condition) {
    return this.bookingSlotRepository.delete(condition);
  }

  async updateOne(condition, data) {
    return this.bookingSlotRepository.updateOne(condition, data);
  }

  async slotsList(data: IPaginate) {
    const { start, length, columns, order, search, draw } = data;
    const sortColumn = columns[order[0].column].data;
    const sortOrder = order[0].dir;
    const searchValue = search.value;
    const search_query = [];
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].searchable) {
        const key = columns[i]['name'];
        search_query.push({
          [key]: { $regex: searchValue, $options: 'i' },
        });
      }
    }
    const sort_q = {
      [sortColumn]: sortOrder,
    };
    let query1;
    if (searchValue) {
      query1 = { $or: search_query };
    } else {
      query1 = {};
    }

    const slots = await this.bookingSlotRepository.getAll(
      { $and: [query1] },
      {},
      { sort: sort_q, skip: start, limit: length },
    );
    const total = await this.bookingSlotRepository.count();
    const stotal = await this.bookingSlotRepository.count({ $and: [query1] });
    return {
      statusCode: HttpStatus.OK,
      slots: slots,
      draw: draw,
      recordsTotal: total,
      recordsFiltered: stotal,
    };
  }

  async scheduleMeeting(data): Promise<any> {
    let user = { ...data.user };
    delete data.user;
    let dbUser = await this.userService.findOne({ email: user.email });
    if (!dbUser) {
      await this.userService.create(user);
      dbUser = await this.userService.findOne({ email: user.email })
    }
    data.user_id = dbUser._id;
    data.description = user.description;
    await this.bookingUserRepository.create(data);


    let bookingSlot = await this.bookingSlotRepository.findOne({ _id: data.booking_slot_id });

    let mailObj: IScheduleMail = {
      to: dbUser.email,
      name: bookingSlot.agenda,
      start_time: bookingSlot.start_time,
      end_time: bookingSlot.end_time,
      location: config.CLIENT_DOMAIN + 'meetingstart/' + bookingSlot.meeting_joining_link,
      subject: 'Meetkro - Welcome',
      meeting_link: config.CLIENT_DOMAIN + 'meetingstart/' + bookingSlot.meeting_joining_link,
      body: `To join the meeting, please click on this link <a href="${config.CLIENT_DOMAIN + 'meetingstart/' + bookingSlot.meeting_joining_link}">JOIN MEETING</a> .
       If the link doesnt work then copy paste the URL to your browser.`
    }
    this.bookingUserService.sendMail(mailObj)
    return { statusCode: HttpStatus.OK, message: 'Booking successfully created' };
  }

}
