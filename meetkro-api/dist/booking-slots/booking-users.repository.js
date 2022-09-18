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
exports.BookingUserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../users/users.schema");
const booking_slots_schema_1 = require("./booking-slots.schema");
const booking_users_schema_1 = require("./booking-users.schema");
let BookingUserRepository = class BookingUserRepository {
    constructor(bookingUserModel) {
        this.bookingUserModel = bookingUserModel;
    }
    async getAll(...condition) {
        return this.bookingUserModel.find(...condition).exec();
    }
    async findAll(...condition) {
        let data = this.bookingUserModel.find(...condition)
            .populate({ path: 'booking_slot_id', model: booking_slots_schema_1.BookingSlot.name })
            .populate({ path: 'user_id', model: users_schema_1.User.name });
        return data;
    }
    async findOne(condition) {
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
    async count(condition) {
        return this.bookingUserModel.countDocuments(condition);
    }
};
BookingUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_users_schema_1.BookingUser.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingUserRepository);
exports.BookingUserRepository = BookingUserRepository;
//# sourceMappingURL=booking-users.repository.js.map