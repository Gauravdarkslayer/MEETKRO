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
exports.UserAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../../users/users.service");
let UserAuthGuard = class UserAuthGuard extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            secretOrKey: 'asda3rfc342#R#Rasd?.,sad',
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.userService = userService;
    }
    async validate(token) {
        console.log({ token });
        const user = await this.userService.findOne({ email: token.email });
        if (user && user.status == true) {
            const session = await this.userService.findUserToken({
                user_id: user._id,
            });
            if (session) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
UserAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserAuthGuard);
exports.UserAuthGuard = UserAuthGuard;
//# sourceMappingURL=user-jwt.guard.js.map