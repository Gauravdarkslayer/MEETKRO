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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSlotService = void 0;
const common_1 = require("@nestjs/common");
const booking_slots_repository_1 = require("./booking-slots.repository");
const moment = require("moment");
const users_service_1 = require("../users/users.service");
const booking_users_repository_1 = require("./booking-users.repository");
const booking_users_service_1 = require("./booking-users.service");
const config_enum_1 = require("../helpers/enums/config.enum");
let BookingSlotService = class BookingSlotService {
    constructor(bookingSlotRepository, userService, bookingUserRepository, bookingUserService) {
        this.bookingSlotRepository = bookingSlotRepository;
        this.userService = userService;
        this.bookingUserRepository = bookingUserRepository;
        this.bookingUserService = bookingUserService;
    }
    async find(condition) {
        return await this.bookingSlotRepository.getAll(condition);
    }
    async create(data) {
        console.log({ data });
        const endDate = moment(data.slotEndDatetime).utcOffset(0, true);
        const startDate = moment(data.slotStartDatetime).utcOffset(0, true);
        const minutes = endDate.diff(startDate, 'minutes');
        const numberOfIntervals = Math.ceil(minutes / data.slotInterval);
        let cleanStartDateTime;
        for (let index = 0; index < numberOfIntervals; index++) {
            let bookingSlotData = {
                start_time: cleanStartDateTime || startDate,
                end_time: cleanStartDateTime ? moment(cleanStartDateTime).utcOffset(0, true).add(data.slotInterval, 'minutes') : moment(startDate).utcOffset(0, true).add(data.slotInterval, 'minutes'),
                agenda: data.slotsAgenda,
                max_members: data.max_members,
                meeting_id: data.meeting_id
            };
            await this.bookingSlotRepository.create(bookingSlotData);
            cleanStartDateTime = bookingSlotData.end_time;
        }
        return {
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findOne(condition) {
        return this.bookingSlotRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.bookingSlotRepository.delete(condition);
    }
    async updateOne(condition, data) {
        return this.bookingSlotRepository.updateOne(condition, data);
    }
    async slotsList(data) {
        const { start, length, columns, order, search, draw } = data;
        const sortColumn = columns[order[0].column].data;
        const sortOrder = order[0].dir;
        const searchValue = search.value;
        const search_query = [];
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].searchable) {
                const key = columns[i]['name'];
                search_query.push({
                    [key]: { $regex: searchValue, $options: 'i' },
                });
            }
        }
        const sort_q = {
            [sortColumn]: sortOrder,
        };
        let query1;
        if (searchValue) {
            query1 = { $or: search_query };
        }
        else {
            query1 = {};
        }
        const slots = await this.bookingSlotRepository.getAll({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await this.bookingSlotRepository.count();
        const stotal = await this.bookingSlotRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            slots: slots,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
    async scheduleMeeting(data) {
        let user = Object.assign({}, data.user);
        delete data.user;
        let dbUser = await this.userService.findOne({ email: user.email });
        if (!dbUser) {
            await this.userService.create(user);
            dbUser = await this.userService.findOne({ email: user.email });
        }
        data.user_id = dbUser._id;
        data.description = user.description;
        await this.bookingUserRepository.create(data);
        let bookingSlot = await this.bookingSlotRepository.findOne({ _id: data.booking_slot_id });
        let mailObj = {
            to: dbUser.email,
            name: bookingSlot.agenda,
            start_time: bookingSlot.start_time,
            end_time: bookingSlot.end_time,
            location: config_enum_1.config.CLIENT_DOMAIN + 'meetingstart/' + bookingSlot.meeting_joining_link,
            subject: 'Meetkro - Welcome',
            meeting_link: config_enum_1.config.CLIENT_DOMAIN + 'meetingstart/' + bookingSlot.meeting_joining_link,
            body: `To join the meeting, please click on this link <a href="${config_enum_1.config.CLIENT_DOMAIN + 'meetingstart/' + bookingSlot.meeting_joining_link}">JOIN MEETING</a> .
       If the link doesnt work then copy paste the URL to your browser.`
        };
        this.bookingUserService.sendMail(mailObj);
        return { statusCode: common_1.HttpStatus.OK, message: 'Booking successfully created' };
    }
};
BookingSlotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_slots_repository_1.BookingSlotRepository,
        users_service_1.UserService,
        booking_users_repository_1.BookingUserRepository,
        booking_users_service_1.BookingUserService])
], BookingSlotService);
exports.BookingSlotService = BookingSlotService;
//# sourceMappingURL=booking-slots.service.js.map