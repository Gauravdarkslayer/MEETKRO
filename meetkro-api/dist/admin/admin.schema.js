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
exports.AdminSchema = exports.Admin = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let Admin = class Admin {
    setPassword(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto
            .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
            .toString('hex');
    }
    validPassword(password) {
        const hash = crypto
            .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
            .toString('hex');
        return this.hash === hash;
    }
    generateJwt() {
        return jwt.sign({ name: this.name, email: this.email, type: 'ADMIN' }, process.env.secretKey || 'asda3rfc342#R#Rasd?.,sad');
    }
};
__decorate([
    (0, mongoose_1.Prop)({ required: ['true', 'Name is required!'] }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required!'],
        match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Email is invalid'],
        index: true,
    }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admin.prototype, "mobile", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admin.prototype, "hash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Admin.prototype, "salt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Admin.prototype, "status", void 0);
Admin = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Admin);
exports.Admin = Admin;
exports.AdminSchema = mongoose_1.SchemaFactory.createForClass(Admin);
exports.AdminSchema.loadClass(Admin);
//# sourceMappingURL=admin.schema.js.map