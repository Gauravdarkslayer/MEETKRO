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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("./admin.repository");
let AdminService = class AdminService {
    constructor(adminTokenRepository) {
        this.adminTokenRepository = adminTokenRepository;
    }
    async create(data) {
        await this.adminTokenRepository.create(data);
    }
    async findOne(condition) {
        return await this.adminTokenRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return await this.adminTokenRepository.delete(condition);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminTokenRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin-token.service.js.map