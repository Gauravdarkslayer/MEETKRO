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
exports.ContentMgmntRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const content_mgmnt_schema_1 = require("./content-mgmnt.schema");
let ContentMgmntRepository = class ContentMgmntRepository {
    constructor(contentmgmntModel) {
        this.contentmgmntModel = contentmgmntModel;
    }
    async findAll(condition) {
        return this.contentmgmntModel.find(...condition).exec();
    }
    async findOne(condition) {
        return this.contentmgmntModel.findOne(condition);
    }
    async create(data) {
        const event = new this.contentmgmntModel(data);
        await event.save();
    }
    async delete(condition) {
        return this.contentmgmntModel.deleteOne(condition);
    }
    async count(condition) {
        return this.contentmgmntModel.countDocuments(condition);
    }
    async updateOne(_id, data) {
        return this.contentmgmntModel.updateOne({ _id }, data);
    }
};
ContentMgmntRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(content_mgmnt_schema_1.ContentMgmnt.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContentMgmntRepository);
exports.ContentMgmntRepository = ContentMgmntRepository;
//# sourceMappingURL=content-mgmnt.repository.js.map