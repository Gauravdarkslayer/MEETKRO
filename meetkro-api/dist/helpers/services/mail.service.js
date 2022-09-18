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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMail(data) {
        this.mailerService
            .sendMail({
            to: data.to,
            from: `Meetkro ${data.from}`,
            subject: data.subject,
            template: data.template,
            context: data === null || data === void 0 ? void 0 : data.context,
            html: data.html,
        })
            .then((success) => {
            console.log('Success mail sent');
        })
            .catch((err) => {
            console.log(err);
        });
    }
    async sendTestMail(data) {
        console.log('reached here..');
        return this.mailerService
            .sendMail({
            from: `"" <${process.env.MAIL_ID}>`,
            to: 'gaurav10me@gmail.com.com',
            template: 'email-cpc-success',
            subject: 'Testing the new mailer service',
            context: data,
        })
            .then((success) => {
            console.log(success);
            return success;
        })
            .catch((err) => {
            console.log(err);
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map