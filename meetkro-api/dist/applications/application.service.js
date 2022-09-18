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
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const application_repository_1 = require("./application.repository");
let ApplicationService = class ApplicationService {
    constructor(applicationRepository) {
        this.applicationRepository = applicationRepository;
    }
    async findAll(condition) {
        return await this.applicationRepository.getAll(condition);
    }
    async create(data) {
        return this.applicationRepository.create(data);
    }
    async findOne(condition) {
        return this.applicationRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.applicationRepository.delete(condition);
    }
    async applicationList(data) {
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
        const applications = await this.applicationRepository.getAll([
            { $and: [query1] },
            {},
            { sort: sort_q, skip: start, limit: length },
        ]);
        const total = await this.applicationRepository.count();
        const stotal = await this.applicationRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            applications: applications,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
};
ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [application_repository_1.ApplicationRepository])
], ApplicationService);
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map