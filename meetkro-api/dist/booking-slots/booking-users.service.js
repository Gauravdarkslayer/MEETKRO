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
exports.BookingUserService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const booking_users_repository_1 = require("./booking-users.repository");
const mailer_1 = require("@nestjs-modules/mailer");
const ical_generator_1 = require("ical-generator");
let BookingUserService = class BookingUserService {
    constructor(bookingUserRepository, mailService) {
        this.bookingUserRepository = bookingUserRepository;
        this.mailService = mailService;
    }
    async find(condition) {
        return await this.bookingUserRepository.getAll(condition);
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
                agenda: data.slotsAgenda
            };
            await this.bookingUserRepository.create(bookingSlotData);
            cleanStartDateTime = bookingSlotData.end_time;
        }
        return {
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findOne(condition) {
        return this.bookingUserRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.bookingUserRepository.delete(condition);
    }
    async updateOne(condition, data) {
        return this.bookingUserRepository.updateOne(condition, data);
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
        const slots = await this.bookingUserRepository.getAll({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await this.bookingUserRepository.count();
        const stotal = await this.bookingUserRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            slots: slots,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
    async getMeetingsByPaginate(data) {
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
        const meetings = await this.bookingUserRepository.findAll({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await this.bookingUserRepository.count();
        const stotal = await this.bookingUserRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            meetings: meetings,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
    getIcalObjectInstance(icalObject) {
        const cal = (0, ical_generator_1.default)({ name: icalObject.name });
        cal.createEvent({
            start: icalObject.start_time,
            end: icalObject.end_time,
            summary: 'MeetKro has booked a slot for you !!',
            location: icalObject.meeting_link,
            url: icalObject.meeting_link,
            organizer: {
                name: 'name',
                email: 'gaurav10me@gmail.com'
            },
        });
        return cal;
    }
    sendMail(mailData) {
        let calendarObj = this.getIcalObjectInstance(mailData);
        this.mailService
            .sendMail({
            to: mailData.to,
            from: `noreply@meetkro.com`,
            subject: 'Appointment',
            text: 'Please see the attached appointment',
            icalEvent: {
                filename: 'invitation.ics',
                method: 'request',
                content: new Buffer(calendarObj.toString())
            },
            html: mailData.body
        })
            .then((success) => {
            console.log('Success mail sent');
        })
            .catch((err) => {
            console.log(err);
        });
    }
    count(condition) {
        return this.bookingUserRepository.count(condition);
    }
};
BookingUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_users_repository_1.BookingUserRepository,
        mailer_1.MailerService])
], BookingUserService);
exports.BookingUserService = BookingUserService;
//# sourceMappingURL=booking-users.service.js.map