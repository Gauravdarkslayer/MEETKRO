import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import {
  UserRepository,
  UserTokenRepository,
  UserPasswordTokenRepository,
} from './users.repository';
import { User } from './users.schema';
import e, { Request } from 'express';
import { SignupDto } from './dtos/signup.dto';
import { MailService } from 'src/helpers/services/mail.service';
import { MailDto } from 'src/core/interfaces/mailService.interface';
import { IPaginate } from '../helpers/interfaces/paginate.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokenRepository,
    private readonly userPasswordTokenRepository: UserPasswordTokenRepository,
    private readonly mailService: MailService,
  ) {}

  async getUsersList(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async create(data) {
    await this.userRepository.create(data);
  }

  async login(loginDto: LoginDto, request: Request): Promise<any> {
    // try {
    const { email, password } = loginDto;
    const userUser = await this.userRepository.findOne({ email });
    if (userUser) {
      if (userUser.validPassword(password)) {
        // if (userUser.status) {
        const token = await userUser.generateJwt();
        const reqIp = request.socket.remoteAddress.split(':')[3] || '';
        const tokenObj = {
          user_id: userUser._id,
          token,
          req_ip: reqIp,
          user_agent: request.headers['user-agent'],
        };
        this.userTokenRepository.create(tokenObj);
        const userUserData = {
          _id: userUser._id,
          name: userUser.name,
          email: userUser.email,
          mobile: userUser.mobile,
        };
        return {
          statusCode: HttpStatus.OK,
          message: 'success',
          data: {
            token: token,
            user_data: userUserData,
          },
        };
        // } else {
        //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        // }
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    // } catch (error) {
    //   console.error(error);
    //   throw new HttpException(
    //     'Internal server error',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async signup(signupDto: SignupDto, request: Request) {
    const { email } = signupDto;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    } else {
      const newuser = await this.userRepository.create(signupDto);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const token = require('crypto').randomBytes(32).toString('hex');
      const data = { user_id: newuser._id, token, email: email };
      await this.userPasswordTokenRepository.create(data);
      const password_reset_link =
        'http://18.119.111.89:4000/api/v1/user/verify-token/' + token;
      const mailDto: MailDto = {
        from: 'noreply@meetkro.com',
        to: email,
        context: { password_reset_link },
        template: 'signup',
        subject: 'Meetkro - Verify Email',
      };

      this.mailService.sendMail(mailDto);
      return {
        status: HttpStatus.OK,
        message: 'signup success! Check your mail for verification',
      };
    }
  }

  async findOne(condition) {
    return this.userRepository.findOne(condition);
  }

  async deleteOne(condition) {
    return this.userRepository.delete(condition);
  }

  async verifyToken(token: string) {
    return await this.userPasswordTokenRepository.findOne({ token });
  }

  async updateOne(condition, data) {
    return this.userRepository.updateOne(condition, data);
  }

  async userList(data: IPaginate) {
    const { start, length, columns, order, search, draw } = data;
    const sortColumn = columns[order[0].column].data;
    const sortOrder = order[0].dir;
    const searchValue = search.value;
    const search_query = [];
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].searchable) {
        const key = columns[i]['name'];
        search_query.push({
          [key]: { $regex: searchValue, $options: 'i' },
        });
      }
    }
    const sort_q = {
      [sortColumn]: sortOrder,
    };
    let query1;
    if (searchValue) {
      query1 = { $or: search_query };
    } else {
      query1 = {};
    }

    const users = await this.userRepository.getAll(
      { $and: [query1] },
      {},
      { sort: sort_q, skip: start, limit: length },
    );
    const total = await this.userRepository.count();
    const stotal = await this.userRepository.count({ $and: [query1] });
    return {
      statusCode: HttpStatus.OK,
      users: users,
      draw: draw,
      recordsTotal: total,
      recordsFiltered: stotal,
    };
  }

  async findUserToken(condition) {
    return this.userTokenRepository.findOne(condition);
  }

  async updatePassword(condition, data) {
    const user = await this.findOne(condition);
    if (user) {
      if (user.validPassword(data.oldPassword)) {
        user.setPassword(data.newPassword);
        await user.save();
        return user;
      } else {
        throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException("Email Doesn't exist", HttpStatus.BAD_REQUEST);
    } else {
      const otp = Math.floor(
        Math.pow(10, 5 - 1) + Math.random() * 9 * Math.pow(10, 5 - 1),
      );
      await this.userRepository.updateOne({ _id: user._id }, { otp });
      const mailDto: MailDto = {
        from: 'noreply@meetkro.com',
        to: email,
        html: `<p>Your OTP is ${otp}</p>`,
        subject: 'Meetkro - Verify OTP',
      };
      this.mailService.sendMail(mailDto);
      return {
        status: HttpStatus.OK,
        message: 'OTP has been successfully sent over your email',
      };
    }
  }

  async verifyOTP(otp: string) {
    const user = await this.userRepository.findOne({ otp });
    if (!user) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    } else if (user.isOtpVerified) {
      throw new HttpException('OTP already verified', HttpStatus.BAD_REQUEST);
    } else {
      await this.userRepository.updateOne(
        { _id: user._id },
        { otp: '', isOtpVerified: true },
      );
      const token = require('crypto').randomBytes(32).toString('hex');
      const data = { user_id: user._id, token, email: user.email };
      await this.userPasswordTokenRepository.create(data);

      return {
        status: HttpStatus.OK,
        message: 'OTP has been successfully verified',
        data: {
          token,
        },
      };
    }
  }

  async resetPassword(data: { token: string; password: string }) {
    const { token, password } = data;
    const userPasswordToken = await this.userPasswordTokenRepository.findOne({
      token,
    });
    if (!userPasswordToken) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    } else {
      const user = await this.userRepository.findOne({
        _id: userPasswordToken.user_id,
      });
      if (!user) {
        throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
      } else {
        user.setPassword(password);
        await user.save();
        await this.userPasswordTokenRepository.deleteOne({ token });
        await this.userRepository.updateOne(
          { _id: user._id },
          { isOtpVerified: false },
        );
        return {
          status: HttpStatus.OK,
          message: 'Password has been successfully reset',
        };
      }
    }
  }
}
