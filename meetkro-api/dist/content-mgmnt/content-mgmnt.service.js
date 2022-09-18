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
exports.ContentMgmntService = void 0;
const common_1 = require("@nestjs/common");
const content_mgmnt_repository_1 = require("./content-mgmnt.repository");
let ContentMgmntService = class ContentMgmntService {
    constructor(contentmgmntRepository) {
        this.contentmgmntRepository = contentmgmntRepository;
    }
    async findAll(condition) {
        return await this.contentmgmntRepository.findAll(condition);
    }
    async create(data) {
        console.log({ data });
        return this.contentmgmntRepository.create(data);
    }
    async findOne(condition) {
        return this.contentmgmntRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.contentmgmntRepository.delete(condition);
    }
    async updateOne(_id, data) {
        return this.contentmgmntRepository.updateOne(_id, data);
    }
    async contentList(data) {
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
        const contents = await this.contentmgmntRepository.findAll([
            { $and: [query1] },
            {},
            { sort: sort_q, skip: start, limit: length },
        ]);
        const total = await this.contentmgmntRepository.count();
        const stotal = await this.contentmgmntRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            contents: contents,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
};
ContentMgmntService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [content_mgmnt_repository_1.ContentMgmntRepository])
], ContentMgmntService);
exports.ContentMgmntService = ContentMgmntService;
//# sourceMappingURL=content-mgmnt.service.js.map