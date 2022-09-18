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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const events_repository_1 = require("./events.repository");
let EventService = class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async events() {
        return await this.eventRepository.findAll({});
    }
    async create(data) {
        return this.eventRepository.create(data);
    }
    async findOne(condition) {
        return this.eventRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.eventRepository.delete(condition);
    }
    async eventList(data) {
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
        const events = await this.eventRepository.findAll({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await this.eventRepository.count();
        const stotal = await this.eventRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            events: events,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventRepository])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=events.service.js.map