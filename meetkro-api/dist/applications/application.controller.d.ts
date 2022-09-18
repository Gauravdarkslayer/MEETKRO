import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/users/dtos/paginate.dto';
import { ApplicationService } from './application.service';
import { ApplicationDto } from './dtos/application.dto';
export declare class ApplicationController {
    private applicationService;
    constructor(applicationService: ApplicationService);
    createApplication(applicationDto: ApplicationDto, req: any): any;
    getApplicationsByPagination(data: IPaginate): Promise<{
        statusCode: HttpStatus;
        applications: import("./application.schema").Application[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getUserApplications(req: any): Promise<import("./application.schema").Application[]>;
}
