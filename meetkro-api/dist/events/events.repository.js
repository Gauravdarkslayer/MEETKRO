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
exports.EventRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const events_schema_1 = require("./events.schema");
let EventRepository = class EventRepository {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async findAll(...condition) {
        return this.eventModel.find(...condition).exec();
    }
    async findOne(condition) {
        return this.eventModel.findOne(condition);
    }
    async create(data) {
        const event = new this.eventModel(data);
        await event.save();
    }
    async delete(condition) {
        return this.eventModel.deleteOne(condition);
    }
    async count(condition) {
        return this.eventModel.countDocuments(condition);
    }
};
EventRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(events_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventRepository);
exports.EventRepository = EventRepository;
//# sourceMappingURL=events.repository.js.map