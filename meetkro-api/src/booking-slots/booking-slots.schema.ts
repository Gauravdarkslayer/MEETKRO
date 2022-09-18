import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type BookingSlotDocument = BookingSlot & Document;




@Schema({ timestamps: true })
export class BookingSlot {
    @Prop({ required: ['true', 'Name is required!'] })
    agenda: string;

    @Prop({
        type: Date,
        required: [true, 'Start Time is required!'],
    })
    start_time: Date;

    @Prop({
        type: Date,
        required: [true, 'End Time is required!'],
    })
    end_time: Date;

    @Prop({
        type: String,
        index: true,
        default: uuidv4()
    })
    meeting_joining_link: string;


    @Prop({ type: Number, default: 1 })
    max_members: number;



    @Prop({ type: String, default: null })
    meeting_id: string;


    @Prop({ type: String, default: null })
    meeting_password: string;


    @Prop({ default: true })
    status: boolean;


}

export const BookingSlotSchema = SchemaFactory.createForClass(BookingSlot);
BookingSlotSchema.loadClass(BookingSlot);
