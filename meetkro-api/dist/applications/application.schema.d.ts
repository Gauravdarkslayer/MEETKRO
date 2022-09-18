import mongoose, { Document } from 'mongoose';
export declare type ApplicationDocument = Application & Document;
export declare class Application {
    eventId: string;
    userId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    dateOfBirth: Date;
    yearsOfStudy: Number;
    instrument: string;
    phoneNumber: string;
}
export declare const ApplicationSchema: mongoose.Schema<Application, mongoose.Model<Application, any, any, any, any>, {}, {}, any, {}, "type", Application>;
