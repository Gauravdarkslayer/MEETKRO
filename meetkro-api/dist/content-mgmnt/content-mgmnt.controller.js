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
exports.ContentMgmntController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mongodb_1 = require("mongodb");
const content_mgmnt_service_1 = require("./content-mgmnt.service");
let ContentMgmntController = class ContentMgmntController {
    constructor(contentMgmntService) {
        this.contentMgmntService = contentMgmntService;
    }
    async createContent(contentDto) {
        try {
            return {
                data: this.contentMgmntService.create(contentDto),
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getContentsByPagination(data, req) {
        return this.contentMgmntService.contentList(data);
    }
    async getContentById(req) {
        try {
            const data = await this.contentMgmntService.findOne({
                _id: new mongodb_1.ObjectId(req.query.id),
            });
            return { data, statusCode: common_1.HttpStatus.OK };
        }
        catch (error) {
            return error;
        }
    }
    async updateContent(data, req) {
        try {
            const user = await this.contentMgmntService.updateOne({ _id: data._id }, data);
            return {
                message: 'Content updated successfully !',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Post)('v1/admin/createContent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentMgmntController.prototype, "createContent", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('v1/admin/content-by-paginate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentMgmntController.prototype, "getContentsByPagination", null);
__decorate([
    (0, common_1.Get)('v1/admin/content-by-id'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentMgmntController.prototype, "getContentById", null);
__decorate([
    (0, common_1.Post)('v1/admin/updateContent'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentMgmntController.prototype, "updateContent", null);
ContentMgmntController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [content_mgmnt_service_1.ContentMgmntService])
], ContentMgmntController);
exports.ContentMgmntController = ContentMgmntController;
//# sourceMappingURL=content-mgmnt.controller.js.map