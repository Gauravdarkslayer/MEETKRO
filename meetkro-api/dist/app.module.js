"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const admin_module_1 = require("./admin/admin.module");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const admin_jwt_guard_1 = require("./helpers/guards/admin-jwt.guard");
const booking_slots_module_1 = require("./booking-slots/booking-slots.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forRoot(`mongodb://${process.env.MONGODB_DB_HOST || 'localhost'}:${process.env.MONGODB_DB_PORT || '27017'}/${process.env.MONGODB_DB_NAME || 'meetkro'}?authSource=admin&w=1`, process.env.MONGODB_USER && {
                user: process.env.MONGODB_USER || 'root',
                pass: process.env.MONGODB_PASS || 'gaurav#123',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../user/build/'),
            }),
            admin_module_1.AdminModule,
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: {
                            user: 'www.gaurav10bhojwani@gmail.com',
                            pass: 'ebaospjvxmxtqhkl',
                        },
                    },
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secretOrPrivateKey: '#asda#EFHI$Tgds9#Rg@#%((!!0',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            booking_slots_module_1.BookingSlotsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, admin_jwt_guard_1.AdminAuthGuard],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map