import { ObjectId } from "mongoose";

export interface IBookingSlot {
    _id?: ObjectId;
    agenda: string;

    // start_time: Date;
    // end_time: Date;
    status?: boolean;
}