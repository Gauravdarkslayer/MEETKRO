import mongoose, { Document } from 'mongoose';
export declare type AdminTokenDocument = AdminToken & Document;
export declare class AdminToken {
    admin_id: string;
    token: string;
    user_agent: string;
    req_ip: string;
}
export declare const AdminTokenSchema: mongoose.Schema<AdminToken, mongoose.Model<AdminToken, any, any, any, any>, {}, {}, {}, {}, "type", AdminToken>;
