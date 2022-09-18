import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/helpers/interfaces/paginate.dto';
import { BookingSlot } from './booking-slots.schema';
import { BookingSlotService } from './booking-slots.service';
import { BookingUserService } from './booking-users.service';
import { IBookingSlot } from './dtos/booking-slots.dto';
export declare class BookingSlotController {
    private bookingSlotService;
    private bookingUserService;
    constructor(bookingSlotService: BookingSlotService, bookingUserService: BookingUserService);
    createSlot(bookingDto: IBookingSlot): any;
    getSlotsByPagination(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        slots: BookingSlot[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getAvailableSlots(): Promise<(IBookingSlot & {
        remaining_members?: number;
        max_members?: number;
    })[]>;
    scheduleMeeting(data: any): Promise<any>;
    getMeetingDetails(meeting_joining_link: string): Promise<{
        data: string;
        statusCode: HttpStatus;
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
    getSendMail(): Promise<void>;
}
