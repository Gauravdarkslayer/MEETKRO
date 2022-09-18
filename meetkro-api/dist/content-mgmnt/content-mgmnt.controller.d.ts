import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/users/dtos/paginate.dto';
import { ContentMgmntService } from './content-mgmnt.service';
export declare class ContentMgmntController {
    private contentMgmntService;
    constructor(contentMgmntService: ContentMgmntService);
    createContent(contentDto: any): Promise<any>;
    getContentsByPagination(data: IPaginate, req: any): Promise<{
        statusCode: HttpStatus;
        contents: import("./content-mgmnt.schema").ContentMgmnt[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getContentById(req: any): Promise<any>;
    updateContent(data: any, req: any): Promise<any>;
}
