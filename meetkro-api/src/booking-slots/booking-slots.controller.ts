import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { join } from 'path';
import { map, Observable, of } from 'rxjs';
import { IPaginate } from 'src/helpers/interfaces/paginate.dto';
import { BookingSlot } from './booking-slots.schema';
import { BookingSlotService } from './booking-slots.service';
import { BookingUserService } from './booking-users.service';
import { IBookingSlot } from './dtos/booking-slots.dto';

@Controller('v1')
export class BookingSlotController {
    constructor(private bookingSlotService: BookingSlotService,
        private bookingUserService: BookingUserService) { }



    @UseGuards(AuthGuard('jwt'))
    @Post('admin/create-slot')
    createSlot(@Body() bookingDto: IBookingSlot) {
        try {
            return this.bookingSlotService.create(bookingDto);
        } catch (error) {
            return error;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('admin/slots-by-paginate')
    async getSlotsByPagination(@Body() data: IPaginate) {
        return this.bookingSlotService.slotsList(data);
    }

    @Get('user/available-slots')
    async getAvailableSlots() {
        type ISlot = IBookingSlot & { remaining_members?: number, max_members?: number };
        let data: ISlot[] = await this.bookingSlotService.find({});
        // console.log(data)
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let count = await this.bookingUserService.count({ booking_slot_id: element._id }) || 0;
            element.remaining_members = element.max_members - count;
            console.log(element.remaining_members)
        }

        // for (let slot of data) {
        //     slot.remaining_members = slot.max_members - await this.bookingUserService.count({ booking_slot_id: slot._id }) || 0;
        // }
        return data;
    }

    @Post('user/schedule-meeting')
    async scheduleMeeting(@Body() data) {
        // {
        //     user:{
        //         email: 'test@test.com',
        //         name: 'test',
        //     },
        //     booking_slot_id : '1',

        // }
        return this.bookingSlotService.scheduleMeeting(data);
    }

    @Get('user/meeting-details/:link')
    async getMeetingDetails(@Param('link') meeting_joining_link: string) {
        let bookingData = await this.bookingSlotService.findOne({ meeting_joining_link });
        if (bookingData) {
            return { data: bookingData.meeting_id, statusCode: HttpStatus.OK }
        }
        return { data: null, statusCode: HttpStatus.NOT_FOUND }
    }


    @Post('admin/meetings-by-paginate')
    async getMeetingsByPaginate(@Body() data: IPaginate) {
        return this.bookingUserService.getMeetingsByPaginate(data);
    }

    @Get('user/sendMail1')
    async getSendMail() {
        // this.bookingUserService.sendMail();
    }


}
