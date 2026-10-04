import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "../../user/user.service.js";
import { JwtPayload } from "../../interfaces/jwtPayload.interface.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'JOB_SEARCH_SECRET',
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.sub) {
      const user = await this.userService.findById(+payload.sub);
      if (!user) return null;
      return user;
    }
    return null;
  }
}
