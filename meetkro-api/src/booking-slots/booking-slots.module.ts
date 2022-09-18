import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from 'src/helpers/services/mail.service';
import { UserPasswordToken, UserPasswordTokenSchema } from 'src/users/users-password-token.schema';
import { UserToken, UserTokenSchema } from 'src/users/users-token.schema';
import { UserPasswordTokenRepository, UserRepository, UserTokenRepository } from 'src/users/users.repository';
import { User, UserSchema } from 'src/users/users.schema';
import { UserService } from 'src/users/users.service';
import { BookingSlotController } from './booking-slots.controller';
import { BookingSlotRepository } from './booking-slots.repository';
import { BookingSlot, BookingSlotSchema } from './booking-slots.schema';
import { BookingSlotService } from './booking-slots.service';
import { BookingUserRepository } from './booking-users.repository';
import { BookingUser, BookingUserSchema } from './booking-users.schema';
import { BookingUserService } from './booking-users.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: BookingSlot.name, schema: BookingSlotSchema },
            { name: BookingUser.name, schema: BookingUserSchema },
            { name: User.name, schema: UserSchema },
            { name: UserToken.name, schema: UserTokenSchema },
            { name: UserPasswordToken.name, schema: UserPasswordTokenSchema }
        ]),
    ],
    providers: [
        BookingSlotService,
        BookingSlotRepository,
        UserService,
        BookingUserRepository,
        BookingUserService,
        UserRepository,
        UserTokenRepository,
        UserPasswordTokenRepository,
        MailService
    ],
    controllers: [BookingSlotController],
    exports: [BookingSlotService, BookingSlotRepository],
})
export class BookingSlotsModule { }
