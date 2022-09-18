import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from 'src/core/interfaces/mailService.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  public async sendMail(data: MailDto): Promise<any> {
    this.mailerService
      .sendMail({
        to: data.to,
        from: `Meetkro ${data.from}`,
        subject: data.subject,
        template: data.template,
        context: data?.context,
        html: data.html,
      })
      .then((success) => {
        // tslint:disable-next-line: no-console
        console.log('Success mail sent');
      })
      .catch((err) => {
        // tslint:disable-next-line: no-console
        console.log(err);
      });
  }

  public async sendTestMail(data: any): Promise<any> {
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
}
