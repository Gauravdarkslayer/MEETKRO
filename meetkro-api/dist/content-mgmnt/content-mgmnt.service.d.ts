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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/users/dtos/paginate.dto';
import { ContentMgmntRepository } from './content-mgmnt.repository';
import { ContentMgmnt } from './content-mgmnt.schema';
export declare class ContentMgmntService {
    private readonly contentmgmntRepository;
    constructor(contentmgmntRepository: ContentMgmntRepository);
    findAll(condition: object): Promise<ContentMgmnt[]>;
    create(data: any): Promise<void>;
    findOne(condition: any): Promise<ContentMgmnt & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
    updateOne(_id: any, data: any): Promise<import("mongodb").UpdateResult>;
    contentList(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        contents: ContentMgmnt[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
}
