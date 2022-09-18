import mongoose, { Document } from 'mongoose';
export declare type UserPasswordDocument = UserPasswordToken & Document;
export declare class UserPasswordToken {
    user_id: string;
    token: string;
    email: string;
}
export declare const UserPasswordTokenSchema: mongoose.Schema<UserPasswordToken, mongoose.Model<UserPasswordToken, any, any, any, any>, {}, {}, {}, {}, "type", UserPasswordToken>;
