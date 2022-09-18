import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from 'src/helpers/services/mail.service';
import {
  UserPasswordToken,
  UserPasswordTokenSchema,
} from './users-password-token.schema';
import { UserToken, UserTokenSchema } from './users-token.schema';
import { UserController } from './users.controller';
import {
  UserPasswordTokenRepository,
  UserRepository,
  UserTokenRepository,
} from './users.repository';
import { User, UserSchema } from './users.schema';
import { UserService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserToken.name, schema: UserTokenSchema },
      { name: UserPasswordToken.name, schema: UserPasswordTokenSchema },
    ]),
  ],
  providers: [
    UserService,
    UserRepository,
    UserTokenRepository,
    UserPasswordTokenRepository,
    MailService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
