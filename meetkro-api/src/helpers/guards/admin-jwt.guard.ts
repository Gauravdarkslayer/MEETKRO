import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AdminService } from '../../admin/admin.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AdminAuthGuard extends PassportStrategy(Strategy) {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {
    super({
      secretOrKey: 'asda3rfc342#R#Rasd?.,sad',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: any) {
    console.log({ token });
    if (token.type === 'ADMIN') {
      const admin = await this.adminService.findOne({ email: token.email });
      if (admin && admin.status == true) {
        const session = await this.adminService.findAdminToken({
          admin_id: admin._id,
        });
        if (session) {
          return admin;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } else {
      const user = await this.userService.findOne({ email: token.email });

      if (user && user.status == true) {
        const session = await this.userService.findUserToken({
          user_id: user._id,
        });
        if (session) {
          // let data = {
          //   user, token
          // }
          return user;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
