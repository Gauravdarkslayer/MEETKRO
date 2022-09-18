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
exports.BookingSlotController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const booking_slots_service_1 = require("./booking-slots.service");
const booking_users_service_1 = require("./booking-users.service");
let BookingSlotController = class BookingSlotController {
    constructor(bookingSlotService, bookingUserService) {
        this.bookingSlotService = bookingSlotService;
        this.bookingUserService = bookingUserService;
    }
    createSlot(bookingDto) {
        try {
            return this.bookingSlotService.create(bookingDto);
        }
        catch (error) {
            return error;
        }
    }
    async getSlotsByPagination(data) {
        return this.bookingSlotService.slotsList(data);
    }
    async getAvailableSlots() {
        let data = await this.bookingSlotService.find({});
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let count = await this.bookingUserService.count({ booking_slot_id: element._id }) || 0;
            element.remaining_members = element.max_members - count;
            console.log(element.remaining_members);
        }
        return data;
    }
    async scheduleMeeting(data) {
        return this.bookingSlotService.scheduleMeeting(data);
    }
    async getMeetingDetails(meeting_joining_link) {
        let bookingData = await this.bookingSlotService.findOne({ meeting_joining_link });
        if (bookingData) {
            return { data: bookingData.meeting_id, statusCode: common_1.HttpStatus.OK };
        }
        return { data: null, statusCode: common_1.HttpStatus.NOT_FOUND };
    }
    async getMeetingsByPaginate(data) {
        return this.bookingUserService.getMeetingsByPaginate(data);
    }
    async getSendMail() {
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('admin/create-slot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingSlotController.prototype, "createSlot", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('admin/slots-by-paginate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingSlotController.prototype, "getSlotsByPagination", null);
__decorate([
    (0, common_1.Get)('user/available-slots'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingSlotController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Post)('user/schedule-meeting'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingSlotController.prototype, "scheduleMeeting", null);
__decorate([
    (0, common_1.Get)('user/meeting-details/:link'),
    __param(0, (0, common_1.Param)('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingSlotController.prototype, "getMeetingDetails", null);
__decorate([
    (0, common_1.Post)('admin/meetings-by-paginate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingSlotController.prototype, "getMeetingsByPaginate", null);
__decorate([
    (0, common_1.Get)('user/sendMail1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingSlotController.prototype, "getSendMail", null);
BookingSlotController = __decorate([
    (0, common_1.Controller)('v1'),
    __metadata("design:paramtypes", [booking_slots_service_1.BookingSlotService,
        booking_users_service_1.BookingUserService])
], BookingSlotController);
exports.BookingSlotController = BookingSlotController;
//# sourceMappingURL=booking-slots.controller.js.map