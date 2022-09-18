import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/users/users.service';

@Injectable()
export class UserAuthGuard extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: 'asda3rfc342#R#Rasd?.,sad',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: any) {
    console.log({ token });
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
