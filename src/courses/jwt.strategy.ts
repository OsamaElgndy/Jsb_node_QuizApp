import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { jwtConstants } from './constants';
interface Payload {
  firstName: string;
 id: number;
 email: string;
 lastName: string;
 role:string[]
 
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRIT_KEY,
    });
  }

  async validate(payload:Payload ) {
    return { id: payload.id, username: payload.firstName , roles: payload.role, email: payload.email , lastname: payload.lastName };

  }
}