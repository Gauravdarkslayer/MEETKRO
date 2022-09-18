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
    constructor(adminRepository, adminTokenRepository) {
        this.adminRepository = adminRepository;
        this.adminTokenRepository = adminTokenRepository;
    }
    async getUsersList() {
        return await this.adminRepository.getAll();
    }
    async create(data) {
        this.adminRepository.create(data);
    }
    async login(loginDto, request) {
        const { email, password } = loginDto;
        const adminUser = await this.adminRepository.findOne({ email });
        if (adminUser) {
            if (adminUser.validPassword(password)) {
                if (adminUser.status) {
                    const token = await adminUser.generateJwt();
                    const reqIp = request.socket.remoteAddress.split(':')[3] || '';
                    const tokenObj = {
                        admin_id: adminUser._id,
                        token,
                        req_ip: reqIp,
                        user_agent: request.headers['user-agent'],
                    };
                    this.adminTokenRepository.create(tokenObj);
                    const adminUserData = {
                        _id: adminUser._id,
                        name: adminUser.name,
                        email: adminUser.email,
                        mobile: adminUser.mobile,
                    };
                    return {
                        status: common_1.HttpStatus.OK,
                        message: 'success',
                        data: {
                            token: token,
                            admin_user_data: adminUserData,
                        },
                    };
                }
                else {
                    throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            else {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(condition) {
        return this.adminRepository.findOne(condition);
    }
    async deleteOne(condition) {
        return this.adminRepository.delete(condition);
    }
    async findAdminToken(condition) {
        return this.adminTokenRepository.findOne(condition);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        admin_repository_1.AdminTokenRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map