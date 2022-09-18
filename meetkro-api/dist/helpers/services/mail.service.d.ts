import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from 'src/core/interfaces/mailService.interface';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(data: MailDto): Promise<any>;
    sendTestMail(data: any): Promise<any>;
}
