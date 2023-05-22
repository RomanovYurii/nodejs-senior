import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthResolver } from 'src/auth/auth.resolver';
import { CustomerService } from 'src/customer/customer.service';
import { TokenService } from 'src/auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthGuard } from 'src/auth/auth-guard';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AuthService,
    TokenService,
    JwtService,
    CustomerService,
    AuthResolver,
    PrismaService,
    AuthMiddleware,
    AuthGuard,
  ],
})
export class AuthModule {}