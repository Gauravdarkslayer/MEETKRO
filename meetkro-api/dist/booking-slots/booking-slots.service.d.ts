import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/helpers/interfaces/paginate.dto';
import { BookingSlotRepository } from './booking-slots.repository';
import { UserService } from 'src/users/users.service';
import { BookingUserRepository } from './booking-users.repository';
import { IBookingSlot } from './dtos/booking-slots.dto';
import { BookingUserService } from './booking-users.service';
export declare class BookingSlotService {
    private readonly bookingSlotRepository;
    private readonly userService;
    private readonly bookingUserRepository;
    private readonly bookingUserService;
    constructor(bookingSlotRepository: BookingSlotRepository, userService: UserService, bookingUserRepository: BookingUserRepository, bookingUserService: BookingUserService);
    find(condition: any): Promise<IBookingSlot[]>;
    create(data: any): Promise<{
        statusCode: HttpStatus;
    }>;
    findOne(condition: any): Promise<import("./booking-slots.schema").BookingSlot & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
    updateOne(condition: any, data: any): Promise<import("mongodb").UpdateResult>;
    slotsList(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        slots: import("./booking-slots.schema").BookingSlot[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    scheduleMeeting(data: any): Promise<any>;
}
