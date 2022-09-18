"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_module_1 = require("../admin/admin.module");
const mail_service_1 = require("../helpers/services/mail.service");
const events_controller_1 = require("./events.controller");
const events_repository_1 = require("./events.repository");
const events_schema_1 = require("./events.schema");
const events_service_1 = require("./events.service");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            mongoose_1.MongooseModule.forFeature([{ name: events_schema_1.Event.name, schema: events_schema_1.EventSchema }]),
        ],
        providers: [events_service_1.EventService, events_repository_1.EventRepository, mail_service_1.MailService],
        controllers: [events_controller_1.EventController],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map