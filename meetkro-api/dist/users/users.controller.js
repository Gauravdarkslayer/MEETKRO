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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const users_service_1 = require("./users.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsersList() {
        return await this.userService.getUsersList();
    }
    login(loginDto, request) {
        try {
            return this.userService.login(loginDto, request);
        }
        catch (error) {
            return error;
        }
    }
    signup(signupDto, request) {
        try {
            return this.userService.signup(signupDto, request);
        }
        catch (error) {
            return error;
        }
    }
    async verifyToken(token) {
        try {
            const tokenResponse = await this.userService.verifyToken(token);
            if (tokenResponse) {
                this.userService.updateOne({ _id: tokenResponse.user_id }, { status: true });
                return '<h1 style="text-align: center">Email verified successfully, you can now login !</h2>';
            }
            else {
                return { message: 'Invalid Token', statusCode: common_1.HttpStatus.BAD_REQUEST };
            }
        }
        catch (error) {
            return error;
        }
    }
    async getUsersByPagination(data) {
        return this.userService.userList(data);
    }
    async getProfile(req) {
        try {
            const data = await this.userService.findOne({ _id: req.user._id });
            return { data, statusCode: common_1.HttpStatus.OK };
        }
        catch (error) {
            return error;
        }
    }
    async updateProfile(data, req) {
        try {
            const user = await this.userService.updateOne({ _id: req.user._id }, data);
            return {
                message: 'Profile updated successfully !',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return error;
        }
    }
    async changePassword(data, req) {
        try {
            if (data.oldPassword === data.newPassword) {
                return {
                    message: 'New password should not be same as old password',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            await this.userService.updatePassword(req.user._id, data);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Password updated successfully !',
            };
        }
        catch (error) {
            return error;
        }
    }
    async uploadFile(file, req) {
        try {
            let updateUser = await this.userService.updateOne({ _id: req.user._id }, { profileImage: file.filename });
            if (updateUser) {
                let userData = await this.userService.findOne({ _id: req.user._id });
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Profile image updated successfully',
                    data: userData.profileImage,
                };
            }
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Profile image not updated',
            };
        }
        catch (error) {
            console.error(error);
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Something went wrong',
            };
        }
    }
    findProfileImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), `./uploads/profileimages/${imagename}`)));
    }
    async forgotPassword(data) {
        return await this.userService.forgotPassword(data.email);
    }
    async verifyOtp(data) {
        return await this.userService.verifyOTP(data.otp);
    }
    async resetPassword(data) {
        return await this.userService.resetPassword(data);
    }
};
__decorate([
    (0, common_1.Get)('get-users-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersList", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('verify-token/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('users-by-paginate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersByPagination", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('upload-profile-image'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/profileimages',
            filename: (req, res, cb) => {
                const filename = `${Date.now()}-${res.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('profile-image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findProfileImage", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map