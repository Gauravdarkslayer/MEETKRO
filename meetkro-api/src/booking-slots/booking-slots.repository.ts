import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingSlot, BookingSlotDocument } from './booking-slots.schema';

@Injectable()
export class BookingSlotRepository {
  constructor(
    @InjectModel(BookingSlot.name) private bookingSlotModel: Model<BookingSlotDocument>,
  ) {}

  
  async getAll(...condition): Promise<BookingSlot[]> {
    return this.bookingSlotModel.find(...condition).exec();
  }

  async findOne(condition: any) {
    return this.bookingSlotModel.findOne(condition);
  }

  async create(data) {
    const user = new this.bookingSlotModel(data);
    await user.save();
    return user;
  }

  async delete(condition) {
    return this.bookingSlotModel.deleteOne(condition);
  }

  async updateOne(condition, data) {
    return this.bookingSlotModel.updateOne(condition, data);
  }

  async count(condition?) {
    return this.bookingSlotModel.countDocuments(condition);
  }
}
