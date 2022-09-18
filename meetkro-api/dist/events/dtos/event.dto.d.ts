import { EventTypeEnum } from 'src/helpers/enums/event-type.enum';
export interface EventDto {
    name: string;
    eventType: EventTypeEnum;
    scheduledDate: Date;
    scheduledTime: string;
    costOfEvent: number;
    address: string;
}
