import { Model } from 'mongoose';
import { BookingSlot, BookingSlotDocument } from './booking-slots.schema';
export declare class BookingSlotRepository {
    private bookingSlotModel;
    constructor(bookingSlotModel: Model<BookingSlotDocument>);
    getAll(...condition: any[]): Promise<BookingSlot[]>;
    findOne(condition: any): Promise<BookingSlot & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: any): Promise<BookingSlot & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(condition: any): Promise<import("mongodb").DeleteResult>;
    updateOne(condition: any, data: any): Promise<import("mongodb").UpdateResult>;
    count(condition?: any): Promise<number>;
}
