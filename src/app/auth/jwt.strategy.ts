import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // não ignorar expiração do token
      secretOrKey: process.env.JWT_SECRET, // chave secreta
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.name,
      email: payload.email,
    };
  }
}
