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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const application_service_1 = require("./application.service");
let ApplicationController = class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    createApplication(applicationDto, req) {
        try {
            applicationDto.userId = req.user._id;
            return {
                data: this.applicationService.create(applicationDto),
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return error;
        }
    }
    async getApplicationsByPagination(data) {
        return this.applicationService.applicationList(data);
    }
    async getUserApplications(req) {
        return this.applicationService.findAll({ userId: req.user._id });
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('v1/user/submitApplication'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "createApplication", null);
__decorate([
    (0, common_1.Post)('v1/admin/applications-by-paginate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getApplicationsByPagination", null);
__decorate([
    (0, common_1.Get)('v1/user/getUserApplications'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getUserApplications", null);
ApplicationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=application.controller.js.map