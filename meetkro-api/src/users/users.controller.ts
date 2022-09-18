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
import { LoginDto } from './dtos/login.dto';
import { IPaginate } from '../helpers/interfaces/paginate.dto';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from './users.service';

@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-users-list')
  async getUsersList(): Promise<Array<UserDto>> {
    return await this.userService.getUsersList();
  }

  @ApiBearerAuth()
  @Post('login')
  login(@Body() loginDto: LoginDto, @Request() request) {
    try {
      return this.userService.login(loginDto, request);
    } catch (error) {
      return error;
    }
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto, @Request() request) {
    try {
      return this.userService.signup(signupDto, request);
    } catch (error) {
      return error;
    }
  }

  @Get('verify-token/:token')
  async verifyToken(@Param('token') token: string) {
    try {
      const tokenResponse = await this.userService.verifyToken(token);
      if (tokenResponse) {
        this.userService.updateOne(
          { _id: tokenResponse.user_id },
          { status: true },
        );
        return '<h1 style="text-align: center">Email verified successfully, you can now login !</h2>';
      } else {
        return { message: 'Invalid Token', statusCode: HttpStatus.BAD_REQUEST };
      }
    } catch (error) {
      return error;
    }
  }

  @Post('users-by-paginate')
  async getUsersByPagination(@Body() data: IPaginate) {
    return this.userService.userList(data);
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    try {
      const data = await this.userService.findOne({ _id: req.user._id });
      // data.profileImage = `http://18.119.111.89:4000/api/v1/user/profile-image/${data.profileImage}`;
      return { data, statusCode: HttpStatus.OK };
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Body() data: any, @Request() req) {
    try {
      const user = await this.userService.updateOne(
        { _id: req.user._id },
        data,
      );
      return {
        message: 'Profile updated successfully !',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Body() data: any, @Request() req) {
    try {
      if (data.oldPassword === data.newPassword) {
        return {
          message: 'New password should not be same as old password',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      await this.userService.updatePassword(req.user._id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Password updated successfully !',
      };
    } catch (error) {
      return error;
    }
  }

  @Post('upload-profile-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, res, cb) => {
          const filename: string = `${Date.now()}-${res.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<object> {
    try {
      let updateUser = await this.userService.updateOne(
        { _id: req.user._id },
        { profileImage: file.filename },
      );
      if (updateUser) {
        let userData = await this.userService.findOne({ _id: req.user._id });
        return {
          statusCode: HttpStatus.OK,
          message: 'Profile image updated successfully',
          data: userData.profileImage,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Profile image not updated',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      };
    }
  }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), `./uploads/profileimages/${imagename}`)),
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: { email: string }) {
    return await this.userService.forgotPassword(data.email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: { otp: string }) {
    return await this.userService.verifyOTP(data.otp);
  }

  @Post('reset-password')
  async resetPassword(@Body() data: { token: string; password: string }) {
    return await this.userService.resetPassword(data);
  }
}
