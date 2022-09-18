import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/helpers/interfaces/paginate.dto';
import { BookingUserRepository } from './booking-users.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { IBookingSlot } from './dtos/booking-slots.dto';
import { IScheduleMail } from './dtos/schedule-mail.dto';
export declare class BookingUserService {
    private readonly bookingUserRepository;
    private readonly mailService;
    constructor(bookingUserRepository: BookingUserRepository, mailService: MailerService);
    find(condition: any): Promise<IBookingSlot[]>;
    create(data: any): Promise<{
        statusCode: HttpStatus;
    }>;
    findOne(condition: any): Promise<import("./booking-users.schema").BookingUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
    updateOne(condition: any, data: any): Promise<import("mongodb").UpdateResult>;
    slotsList(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        slots: any;
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getMeetingsByPaginate(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        meetings: Omit<Omit<import("./booking-users.schema").BookingUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getIcalObjectInstance(icalObject: IScheduleMail): import("ical-generator").ICalCalendar;
    sendMail(mailData: IScheduleMail): void;
    count(condition?: any): Promise<number>;
}
