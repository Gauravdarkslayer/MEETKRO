"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentMgmntModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const content_mgmnt_repository_1 = require("./content-mgmnt.repository");
const content_mgmnt_schema_1 = require("./content-mgmnt.schema");
const content_mgmnt_service_1 = require("./content-mgmnt.service");
const content_mgmnt_controller_1 = require("./content-mgmnt.controller");
let ContentMgmntModule = class ContentMgmntModule {
};
ContentMgmntModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: content_mgmnt_schema_1.ContentMgmnt.name, schema: content_mgmnt_schema_1.ContentMgmntSchema },
            ]),
        ],
        providers: [content_mgmnt_service_1.ContentMgmntService, content_mgmnt_repository_1.ContentMgmntRepository],
        controllers: [content_mgmnt_controller_1.ContentMgmntController],
    })
], ContentMgmntModule);
exports.ContentMgmntModule = ContentMgmntModule;
//# sourceMappingURL=content-mgmnt.module.js.map