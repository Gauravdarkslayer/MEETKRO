import mongoose, { Document } from 'mongoose';
export declare type BookingUserDocument = BookingUser & Document;
export declare class BookingUser {
    user_id: mongoose.Schema.Types.ObjectId;
    booking_slot_id: mongoose.Schema.Types.ObjectId;
    description: string;
}
export declare const BookingUserSchema: mongoose.Schema<BookingUser, mongoose.Model<BookingUser, any, any, any, any>, {}, {}, {}, {}, "type", BookingUser>;
