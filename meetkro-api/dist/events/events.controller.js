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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mongodb_1 = require("mongodb");
const events_service_1 = require("./events.service");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async createEvent(eventDto) {
        try {
            return {
                data: this.eventService.create(eventDto),
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getUsersByPagination(data, req) {
        return this.eventService.eventList(data);
    }
    async getEvents() {
        try {
            const data = await this.eventService.events();
            return { data, statusCode: common_1.HttpStatus.OK };
        }
        catch (error) {
            return error;
        }
    }
    async getEventById(req) {
        try {
            const data = await this.eventService.findOne({
                _id: new mongodb_1.ObjectId(req.query.id),
            });
            return { data, statusCode: common_1.HttpStatus.OK };
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Post)('v1/admin/createEvent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('v1/admin/events-by-paginate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getUsersByPagination", null);
__decorate([
    (0, common_1.Get)('v1/user/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)('v1/user/event-by-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventById", null);
EventController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [events_service_1.EventService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=events.controller.js.map