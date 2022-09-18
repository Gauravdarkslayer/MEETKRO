import mongoose, { Document } from 'mongoose';
export declare type UserTokenDocument = UserToken & Document;
export declare class UserToken {
    user_id: string;
    token: string;
    user_agent: string;
    req_ip: string;
}
export declare const UserTokenSchema: mongoose.Schema<UserToken, mongoose.Model<UserToken, any, any, any, any>, {}, {}, {}, {}, "type", UserToken>;
