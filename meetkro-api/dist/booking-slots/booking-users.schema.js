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
exports.BookingUserSchema = exports.BookingUser = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookingUser = class BookingUser {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'user' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], BookingUser.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'bookingslot' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], BookingUser.prototype, "booking_slot_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'NIL' }),
    __metadata("design:type", String)
], BookingUser.prototype, "description", void 0);
BookingUser = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BookingUser);
exports.BookingUser = BookingUser;
exports.BookingUserSchema = mongoose_1.SchemaFactory.createForClass(BookingUser);
exports.BookingUserSchema.loadClass(BookingUser);
//# sourceMappingURL=booking-users.schema.js.map