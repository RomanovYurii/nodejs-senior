import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: { email: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: 'yr_991020',
    });
  }

  async generateRefreshToken(): Promise<string> {
    return await bcrypt.genSalt();
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      return null;
    }
  }
}
