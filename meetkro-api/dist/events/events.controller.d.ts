import { HttpStatus } from '@nestjs/common';
import { IPaginate } from 'src/users/dtos/paginate.dto';
import { EventDto } from './dtos/event.dto';
import { EventService } from './events.service';
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    createEvent(eventDto: EventDto): Promise<any>;
    getUsersByPagination(data: IPaginate, req: any): Promise<{
        statusCode: HttpStatus;
        events: import("./events.schema").Event[];
        draw: number;
        recordsTotal: number;
        recordsFiltered: number;
    }>;
    getEvents(): Promise<any>;
    getEventById(req: any): Promise<any>;
}
