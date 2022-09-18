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
import { ApplicationRepository } from './application.repository';
import { Application } from './application.schema';
export declare class ApplicationService {
    private readonly applicationRepository;
    constructor(applicationRepository: ApplicationRepository);
    findAll(condition: object): Promise<Application[]>;
    create(data: any): Promise<void>;
    findOne(condition: any): Promise<Application & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOne(condition: any): Promise<import("mongodb").DeleteResult>;
    applicationList(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        applications: Application[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
}
