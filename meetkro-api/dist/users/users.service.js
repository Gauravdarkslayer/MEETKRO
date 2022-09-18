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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const mail_service_1 = require("../helpers/services/mail.service");
let UserService = class UserService {
    constructor(userRepository, userTokenRepository, userPasswordTokenRepository, mailService) {
        this.userRepository = userRepository;
        this.userTokenRepository = userTokenRepository;
        this.userPasswordTokenRepository = userPasswordTokenRepository;
        this.mailService = mailService;
    }
    async getUsersList() {
        return await this.userRepository.getAll();
    }
    async create(data) {
        await this.userRepository.create(data);
    }
    async login(loginDto, request) {
        const { email, password } = loginDto;
        const userUser = await this.userRepository.findOne({ email });
        if (userUser) {
            if (userUser.validPassword(password)) {
                const token = await userUser.generateJwt();
                const reqIp = request.socket.remoteAddress.split(':')[3] || '';
                const tokenObj = {
                    user_id: userUser._id,
                    token,
                    req_ip: reqIp,
                    user_agent: request.headers['user-agent'],
                };
                this.userTokenRepository.create(tokenObj);
                const userUserData = {
                    _id: userUser._id,
                    name: userUser.name,
                    email: userUser.email,
                    mobile: userUser.mobile,
                };
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'success',
                    data: {
                        token: token,
                        user_data: userUserData,
                    },
                };
            }
            else {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signup(signupDto, request) {
        const { email } = signupDto;
        const user = await this.userRepository.findOne({ email });
        if (user) {
            throw new common_1.HttpException('Email already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const newuser = await this.userRepository.create(signupDto);
            const token = require('crypto').randomBytes(32).toString('hex');
            const data = { user_id: newuser._id, token, email: email };
            await this.userPasswordTokenRepository.create(data);
            const password_reset_link = 'http://18.119.111.89:4000/api/v1/user/verify-token/' + token;
            const mailDto = {
                from: 'noreply@meetkro.com',
                to: email,
                context: { password_reset_link },
                template: 'signup',
                subject: 'Meetkro - Verify Email',
            };
            this.mailService.sendMail(mailDto);
            return {
                status: common_1.HttpStatus.OK,
                message: 'signup success! Check your mail for verification',
            };
        }
    }
    async findOne(condition) {
        return this.userRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.userRepository.delete(condition);
    }
    async verifyToken(token) {
        return await this.userPasswordTokenRepository.findOne({ token });
    }
    async updateOne(condition, data) {
        return this.userRepository.updateOne(condition, data);
    }
    async userList(data) {
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
        const users = await this.userRepository.getAll({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await this.userRepository.count();
        const stotal = await this.userRepository.count({ $and: [query1] });
        return {
            statusCode: common_1.HttpStatus.OK,
            users: users,
            draw: draw,
            recordsTotal: total,
            recordsFiltered: stotal,
        };
    }
    async findUserToken(condition) {
        return this.userTokenRepository.findOne(condition);
    }
    async updatePassword(condition, data) {
        const user = await this.findOne(condition);
        if (user) {
            if (user.validPassword(data.oldPassword)) {
                user.setPassword(data.newPassword);
                await user.save();
                return user;
            }
            else {
                throw new common_1.HttpException('Invalid Password', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new common_1.HttpException("Email Doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const otp = Math.floor(Math.pow(10, 5 - 1) + Math.random() * 9 * Math.pow(10, 5 - 1));
            await this.userRepository.updateOne({ _id: user._id }, { otp });
            const mailDto = {
                from: 'noreply@meetkro.com',
                to: email,
                html: `<p>Your OTP is ${otp}</p>`,
                subject: 'Meetkro - Verify OTP',
            };
            this.mailService.sendMail(mailDto);
            return {
                status: common_1.HttpStatus.OK,
                message: 'OTP has been successfully sent over your email',
            };
        }
    }
    async verifyOTP(otp) {
        const user = await this.userRepository.findOne({ otp });
        if (!user) {
            throw new common_1.HttpException('Invalid OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (user.isOtpVerified) {
            throw new common_1.HttpException('OTP already verified', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            await this.userRepository.updateOne({ _id: user._id }, { otp: '', isOtpVerified: true });
            const token = require('crypto').randomBytes(32).toString('hex');
            const data = { user_id: user._id, token, email: user.email };
            await this.userPasswordTokenRepository.create(data);
            return {
                status: common_1.HttpStatus.OK,
                message: 'OTP has been successfully verified',
                data: {
                    token,
                },
            };
        }
    }
    async resetPassword(data) {
        const { token, password } = data;
        const userPasswordToken = await this.userPasswordTokenRepository.findOne({
            token,
        });
        if (!userPasswordToken) {
            throw new common_1.HttpException('Invalid Token', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const user = await this.userRepository.findOne({
                _id: userPasswordToken.user_id,
            });
            if (!user) {
                throw new common_1.HttpException('Invalid User', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                user.setPassword(password);
                await user.save();
                await this.userPasswordTokenRepository.deleteOne({ token });
                await this.userRepository.updateOne({ _id: user._id }, { isOtpVerified: false });
                return {
                    status: common_1.HttpStatus.OK,
                    message: 'Password has been successfully reset',
                };
            }
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        users_repository_1.UserTokenRepository,
        users_repository_1.UserPasswordTokenRepository,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map