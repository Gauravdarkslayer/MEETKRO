import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import {
  AdminPasswordSchema,
  AdminPasswordToken,
} from './admin-password-token.schema';
import { AdminToken, AdminTokenSchema } from './admin-token.schema';
import { AdminController } from './admin.controller';
import {
  AdminPasswordTokenRepository,
  AdminRepository,
  AdminTokenRepository,
} from './admin.repository';
import { AdminSchema } from './admin.schema';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: AdminToken.name, schema: AdminTokenSchema },
      { name: AdminPasswordToken.name, schema: AdminPasswordSchema },
    ]),
  ],
  providers: [
    AdminService,
    AdminRepository,
    AdminTokenRepository,
    AdminPasswordTokenRepository,
  ],
  controllers: [AdminController],
  exports: [AdminService, AdminRepository, AdminTokenRepository],
})
export class AdminModule {}
