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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPasswordTokenRepository = exports.AdminTokenRepository = exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin_password_token_schema_1 = require("./admin-password-token.schema");
const admin_token_schema_1 = require("./admin-token.schema");
const admin_schema_1 = require("./admin.schema");
let AdminRepository = class AdminRepository {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async getAll() {
        return this.adminModel.find().exec();
    }
    async findOne(condition) {
        return this.adminModel.findOne(condition);
    }
    async create(data) {
        const admin = new this.adminModel(data);
        admin.setPassword(data.password);
        await admin.save();
    }
    async delete(condition) {
        return this.adminModel.deleteOne(condition);
    }
};
AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminRepository);
exports.AdminRepository = AdminRepository;
let AdminTokenRepository = class AdminTokenRepository {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    create(data) {
        const admin = new this.adminModel(data);
        admin.save();
    }
    findOne(condition) {
        return this.adminModel.findOne(condition);
    }
    delete(condition) {
        return this.adminModel.deleteOne(condition);
    }
};
AdminTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_token_schema_1.AdminToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminTokenRepository);
exports.AdminTokenRepository = AdminTokenRepository;
let AdminPasswordTokenRepository = class AdminPasswordTokenRepository {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
};
AdminPasswordTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_password_token_schema_1.AdminPasswordToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminPasswordTokenRepository);
exports.AdminPasswordTokenRepository = AdminPasswordTokenRepository;
//# sourceMappingURL=admin.repository.js.map