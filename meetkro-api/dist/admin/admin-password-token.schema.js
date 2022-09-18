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
exports.AdminPasswordSchema = exports.AdminPasswordToken = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AdminPasswordToken = class AdminPasswordToken {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'admin' }),
    __metadata("design:type", String)
], AdminPasswordToken.prototype, "admin_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AdminPasswordToken.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    __metadata("design:type", String)
], AdminPasswordToken.prototype, "email", void 0);
AdminPasswordToken = __decorate([
    (0, mongoose_1.Schema)()
], AdminPasswordToken);
exports.AdminPasswordToken = AdminPasswordToken;
exports.AdminPasswordSchema = mongoose_1.SchemaFactory.createForClass(AdminPasswordToken);
//# sourceMappingURL=admin-password-token.schema.js.map