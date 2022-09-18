"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSlotsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mail_service_1 = require("../helpers/services/mail.service");
const users_password_token_schema_1 = require("../users/users-password-token.schema");
const users_token_schema_1 = require("../users/users-token.schema");
const users_repository_1 = require("../users/users.repository");
const users_schema_1 = require("../users/users.schema");
const users_service_1 = require("../users/users.service");
const booking_slots_controller_1 = require("./booking-slots.controller");
const booking_slots_repository_1 = require("./booking-slots.repository");
const booking_slots_schema_1 = require("./booking-slots.schema");
const booking_slots_service_1 = require("./booking-slots.service");
const booking_users_repository_1 = require("./booking-users.repository");
const booking_users_schema_1 = require("./booking-users.schema");
const booking_users_service_1 = require("./booking-users.service");
let BookingSlotsModule = class BookingSlotsModule {
};
BookingSlotsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: booking_slots_schema_1.BookingSlot.name, schema: booking_slots_schema_1.BookingSlotSchema },
                { name: booking_users_schema_1.BookingUser.name, schema: booking_users_schema_1.BookingUserSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: users_token_schema_1.UserToken.name, schema: users_token_schema_1.UserTokenSchema },
                { name: users_password_token_schema_1.UserPasswordToken.name, schema: users_password_token_schema_1.UserPasswordTokenSchema }
            ]),
        ],
        providers: [
            booking_slots_service_1.BookingSlotService,
            booking_slots_repository_1.BookingSlotRepository,
            users_service_1.UserService,
            booking_users_repository_1.BookingUserRepository,
            booking_users_service_1.BookingUserService,
            users_repository_1.UserRepository,
            users_repository_1.UserTokenRepository,
            users_repository_1.UserPasswordTokenRepository,
            mail_service_1.MailService
        ],
        controllers: [booking_slots_controller_1.BookingSlotController],
        exports: [booking_slots_service_1.BookingSlotService, booking_slots_repository_1.BookingSlotRepository],
    })
], BookingSlotsModule);
exports.BookingSlotsModule = BookingSlotsModule;
//# sourceMappingURL=booking-slots.module.js.map