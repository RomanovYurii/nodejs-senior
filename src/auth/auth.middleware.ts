import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { TokenService } from './token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const payload = await this.tokenService.verifyToken(token);
      if (payload) {
        req.user = payload;
      }
    }

    next();
  }
}
