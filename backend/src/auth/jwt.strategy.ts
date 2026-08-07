import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: 'susidplus_secret_key',
    });
  }


  async validate(payload: any) {

    return {
      userId: payload.userId,
      phone: payload.phone,
      susidNumber: payload.susidNumber,
    };

  }

}
