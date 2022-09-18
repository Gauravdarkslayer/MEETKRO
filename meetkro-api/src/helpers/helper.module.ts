import { Module } from '@nestjs/common';
import { AdminAuthGuard } from './guards/admin-jwt.guard';
import { MailService } from './services/mail.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [MailService, AdminAuthGuard],
  exports: [MailService],
})
export class HelperModule {}
