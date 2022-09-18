import mongoose, { Document } from 'mongoose';
export declare type AdminPasswordDocument = AdminPasswordToken & Document;
export declare class AdminPasswordToken {
    admin_id: string;
    token: string;
    email: string;
}
export declare const AdminPasswordSchema: mongoose.Schema<AdminPasswordToken, mongoose.Model<AdminPasswordToken, any, any, any, any>, {}, {}, {}, {}, "type", AdminPasswordToken>;
