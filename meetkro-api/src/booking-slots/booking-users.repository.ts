import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { BookingSlot } from './booking-slots.schema';
import { BookingUser, BookingUserDocument } from './booking-users.schema';

@Injectable()
export class BookingUserRepository {
    constructor(
        @InjectModel(BookingUser.name) private bookingUserModel: Model<BookingUserDocument>,
    ) { }


    async getAll(...condition): Promise<any> {
        return this.bookingUserModel.find(...condition).exec();
    }

    async findAll(...condition) {
        let data = this.bookingUserModel.find(...condition)
            .populate({ path: 'booking_slot_id', model: BookingSlot.name })
            .populate({ path: 'user_id', model: User.name })
        return data;
    }

    async findOne(condition: any) {
        return this.bookingUserModel.findOne(condition);
    }

    async create(data) {
        const buser = new this.bookingUserModel(data);
        await buser.save();
        return buser;
    }

    async delete(condition) {
        return this.bookingUserModel.deleteOne(condition);
    }

    async updateOne(condition, data) {
        return this.bookingUserModel.updateOne(condition, data);
    }

    async count(condition?) {
        return this.bookingUserModel.countDocuments(condition);
    }
}
