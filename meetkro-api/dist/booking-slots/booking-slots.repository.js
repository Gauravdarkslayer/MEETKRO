"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSlotRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_slots_schema_1 = require("./booking-slots.schema");
let BookingSlotRepository = class BookingSlotRepository {
    constructor(bookingSlotModel) {
        this.bookingSlotModel = bookingSlotModel;
    }
    async getAll(...condition) {
        return this.bookingSlotModel.find(...condition).exec();
    }
    async findOne(condition) {
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
    async count(condition) {
        return this.bookingSlotModel.countDocuments(condition);
    }
};
BookingSlotRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_slots_schema_1.BookingSlot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingSlotRepository);
exports.BookingSlotRepository = BookingSlotRepository;
//# sourceMappingURL=booking-slots.repository.js.map