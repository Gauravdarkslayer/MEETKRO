import mongoose, { Document } from 'mongoose';
export declare type ContentMgmntDocument = ContentMgmnt & Document;
export declare class ContentMgmnt {
    page: string;
    description: string;
}
export declare const ContentMgmntSchema: mongoose.Schema<ContentMgmnt, mongoose.Model<ContentMgmnt, any, any, any, any>, {}, {}, any, {}, "type", ContentMgmnt>;
