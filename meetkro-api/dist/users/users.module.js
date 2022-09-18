"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mail_service_1 = require("../helpers/services/mail.service");
const users_password_token_schema_1 = require("./users-password-token.schema");
const users_token_schema_1 = require("./users-token.schema");
const users_controller_1 = require("./users.controller");
const users_repository_1 = require("./users.repository");
const users_schema_1 = require("./users.schema");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: users_token_schema_1.UserToken.name, schema: users_token_schema_1.UserTokenSchema },
                { name: users_password_token_schema_1.UserPasswordToken.name, schema: users_password_token_schema_1.UserPasswordTokenSchema },
            ]),
        ],
        providers: [
            users_service_1.UserService,
            users_repository_1.UserRepository,
            users_repository_1.UserTokenRepository,
            users_repository_1.UserPasswordTokenRepository,
            mail_service_1.MailService,
        ],
        controllers: [users_controller_1.UserController],
        exports: [users_service_1.UserService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map