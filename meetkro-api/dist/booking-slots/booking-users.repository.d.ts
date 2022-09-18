import { Model } from 'mongoose';
import { BookingUser, BookingUserDocument } from './booking-users.schema';
export declare class BookingUserRepository {
    private bookingUserModel;
    constructor(bookingUserModel: Model<BookingUserDocument>);
    getAll(...condition: any[]): Promise<any>;
    findAll(...condition: any[]): Promise<Omit<Omit<BookingUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOne(condition: any): Promise<BookingUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: any): Promise<BookingUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(condition: any): Promise<import("mongodb").DeleteResult>;
    updateOne(condition: any, data: any): Promise<import("mongodb").UpdateResult>;
    count(condition?: any): Promise<number>;
}
