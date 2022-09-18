import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BookingUserDocument = BookingUser & Document;




@Schema({ timestamps: true })
export class BookingUser {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    user_id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'bookingslot' })
    booking_slot_id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, default: 'NIL' })
    description: string;
}

export const BookingUserSchema = SchemaFactory.createForClass(BookingUser);
BookingUserSchema.loadClass(BookingUser);
