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
import { UserPasswordDocument, UserPasswordToken } from './users-password-token.schema';
import { UserToken, UserTokenDocument } from './users-token.schema';
import { User, UserDocument } from './users.schema';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAll(...condition: any[]): Promise<User[]>;
    findOne(condition: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(condition: any): Promise<import("mongodb").DeleteResult>;
    updateOne(condition: any, data: any): Promise<import("mongodb").UpdateResult>;
    count(condition?: any): Promise<number>;
}
export declare class UserTokenRepository {
    private userModel;
    constructor(userModel: Model<UserTokenDocument>);
    create(data: any): void;
    findOne(condition: any): import("mongoose").Query<UserToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, UserToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, UserTokenDocument>;
}
export declare class UserPasswordTokenRepository {
    private userModel;
    constructor(userModel: Model<UserPasswordDocument>);
    create(data: any): Promise<UserPasswordToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOne(condition: any): Promise<UserPasswordToken & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
}
