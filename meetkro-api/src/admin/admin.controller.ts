import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dtos/login.dto';

@Controller('v1/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('get-users-list')
  getUsersList() {
    return this.adminService.getUsersList();
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Request() request) {
    try {
      return this.adminService.login(loginDto, request);
    } catch (error) {
      return error;
    }
  }

  @Get('runse')
  async seesds() {
    await this.adminService.deleteOne({ email: 'admin@meetkro.com' });
    const admin = await this.adminService.findOne({ email: 'admin@meetkro.com' });
    if (!admin) {
      this.adminService.create({
        email: 'admin@meetkro.com',
        mobile: '9009238485',
        password: 'MeetkroAdmin@123',
        name: 'Meetkro Admin',
      });
      return 'created';
    }
    return 'NO';
  }
}
