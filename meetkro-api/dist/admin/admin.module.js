"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const admin_password_token_schema_1 = require("./admin-password-token.schema");
const admin_token_schema_1 = require("./admin-token.schema");
const admin_controller_1 = require("./admin.controller");
const admin_repository_1 = require("./admin.repository");
const admin_schema_1 = require("./admin.schema");
const admin_service_1 = require("./admin.service");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: mongodb_1.Admin.name, schema: admin_schema_1.AdminSchema },
                { name: admin_token_schema_1.AdminToken.name, schema: admin_token_schema_1.AdminTokenSchema },
                { name: admin_password_token_schema_1.AdminPasswordToken.name, schema: admin_password_token_schema_1.AdminPasswordSchema },
            ]),
        ],
        providers: [
            admin_service_1.AdminService,
            admin_repository_1.AdminRepository,
            admin_repository_1.AdminTokenRepository,
            admin_repository_1.AdminPasswordTokenRepository,
        ],
        controllers: [admin_controller_1.AdminController],
        exports: [admin_service_1.AdminService, admin_repository_1.AdminRepository, admin_repository_1.AdminTokenRepository],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map