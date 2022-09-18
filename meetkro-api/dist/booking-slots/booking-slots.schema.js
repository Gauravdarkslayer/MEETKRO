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
exports.BookingSlotSchema = exports.BookingSlot = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
let BookingSlot = class BookingSlot {
};
__decorate([
    (0, mongoose_1.Prop)({ required: ['true', 'Name is required!'] }),
    __metadata("design:type", String)
], BookingSlot.prototype, "agenda", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: [true, 'Start Time is required!'],
    }),
    __metadata("design:type", Date)
], BookingSlot.prototype, "start_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: [true, 'End Time is required!'],
    }),
    __metadata("design:type", Date)
], BookingSlot.prototype, "end_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        index: true,
        default: (0, uuid_1.v4)()
    }),
    __metadata("design:type", String)
], BookingSlot.prototype, "meeting_joining_link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], BookingSlot.prototype, "max_members", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], BookingSlot.prototype, "meeting_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], BookingSlot.prototype, "meeting_password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], BookingSlot.prototype, "status", void 0);
BookingSlot = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BookingSlot);
exports.BookingSlot = BookingSlot;
exports.BookingSlotSchema = mongoose_1.SchemaFactory.createForClass(BookingSlot);
exports.BookingSlotSchema.loadClass(BookingSlot);
//# sourceMappingURL=booking-slots.schema.js.map