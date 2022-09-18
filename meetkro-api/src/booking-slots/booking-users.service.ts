import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailService } from 'src/helpers/services/mail.service';
import { MailDto } from 'src/core/interfaces/mailService.interface';
import { IPaginate } from 'src/helpers/interfaces/paginate.dto';
import { BookingSlotRepository } from './booking-slots.repository';
import * as moment from "moment";
import { UserService } from 'src/users/users.service';
import { BookingUserRepository } from './booking-users.repository';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer'
import ical from 'ical-generator'
import { IBookingSlot } from './dtos/booking-slots.dto';
import { IScheduleMail } from './dtos/schedule-mail.dto';

@Injectable()
export class BookingUserService {
  constructor(
    private readonly bookingUserRepository: BookingUserRepository,
    private readonly mailService: MailerService
  ) { }

  async find(condition): Promise<IBookingSlot[]> {
    return await this.bookingUserRepository.getAll(condition);
  }

  async create(data) {
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
        agenda: data.slotsAgenda
      };
      // startDate = endDate.add(minutes, 'minutes')
      await this.bookingUserRepository.create(bookingSlotData);
      cleanStartDateTime = bookingSlotData.end_time;
    }

    return {
      statusCode: HttpStatus.OK,
    }

  }


  async findOne(condition) {
    return this.bookingUserRepository.findOne(condition);
  }

  async deleteOne(condition) {
    return this.bookingUserRepository.delete(condition);
  }

  async updateOne(condition, data) {
    return this.bookingUserRepository.updateOne(condition, data);
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

    const slots = await this.bookingUserRepository.getAll(
      { $and: [query1] },
      {},
      { sort: sort_q, skip: start, limit: length },
    );
    const total = await this.bookingUserRepository.count();
    const stotal = await this.bookingUserRepository.count({ $and: [query1] });
    return {
      statusCode: HttpStatus.OK,
      slots: slots,
      draw: draw,
      recordsTotal: total,
      recordsFiltered: stotal,
    };
  }


  async getMeetingsByPaginate(data: IPaginate) {
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

    const meetings = await this.bookingUserRepository.findAll(
      { $and: [query1] },
      {},
      { sort: sort_q, skip: start, limit: length },
    );
    const total = await this.bookingUserRepository.count();
    const stotal = await this.bookingUserRepository.count({ $and: [query1] });
    return {
      statusCode: HttpStatus.OK,
      meetings: meetings,
      draw: draw,
      recordsTotal: total,
      recordsFiltered: stotal,
    };
  }


  getIcalObjectInstance(icalObject: IScheduleMail) {
    const cal = ical({ name: icalObject.name });
    // cal.domain("mytestwebsite.com");
    cal.createEvent({
      start: icalObject.start_time,         // eg : moment()
      end: icalObject.end_time,             // eg : moment(1,'days')
      summary: 'MeetKro has booked a slot for you !!',         // 'Summary of your event'
      location: icalObject.meeting_link,       // 'Delhi'
      url: icalObject.meeting_link,                 // 'event url'
      organizer: {              // 'organizer details'
        name: 'name',
        email: 'gaurav10me@gmail.com'
      },
    });
    return cal;
  }

  sendMail(mailData: IScheduleMail) {

    let calendarObj = this.getIcalObjectInstance(mailData)
    // https://meet.google.com/zks-fvnt-oca

    this.mailService
      .sendMail({
        to: mailData.to,
        from: `noreply@meetkro.com`,
        subject: 'Appointment',
        text: 'Please see the attached appointment',
        icalEvent: {
          filename: 'invitation.ics',
          method: 'request',
          content: new Buffer(calendarObj.toString())
        },
        html: mailData.body
      })
      .then((success) => {
        // tslint:disable-next-line: no-console
        console.log('Success mail sent');
      })
      .catch((err) => {
        // tslint:disable-next-line: no-console
        console.log(err);
      });
  }


  count(condition?): Promise<number> {
    return this.bookingUserRepository.count(condition);
  }

}
