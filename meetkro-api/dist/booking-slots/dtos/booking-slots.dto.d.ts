import { ObjectId } from "mongoose";
export interface IBookingSlot {
    _id?: ObjectId;
    agenda: string;
    status?: boolean;
}
