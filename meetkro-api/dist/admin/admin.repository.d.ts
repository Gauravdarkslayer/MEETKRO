/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { AdminPasswordDocument } from './admin-password-token.schema';
import { AdminToken, AdminTokenDocument } from './admin-token.schema';
import { Admin, AdminDocument } from './admin.schema';
export declare class AdminRepository {
    private adminModel;
    constructor(adminModel: Model<AdminDocument>);
    getAll(): Promise<Admin[]>;
    findOne(condition: any): Promise<Admin & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: any): Promise<void>;
    delete(condition: any): Promise<import("mongodb").DeleteResult>;
}
export declare class AdminTokenRepository {
    private adminModel;
    constructor(adminModel: Model<AdminTokenDocument>);
    create(data: any): void;
    findOne(condition: any): import("mongoose").Query<AdminToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, AdminToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, AdminTokenDocument>;
    delete(condition: any): import("mongoose").Query<import("mongodb").DeleteResult, AdminToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, AdminTokenDocument>;
}
export declare class AdminPasswordTokenRepository {
    private adminModel;
    constructor(adminModel: Model<AdminPasswordDocument>);
}
