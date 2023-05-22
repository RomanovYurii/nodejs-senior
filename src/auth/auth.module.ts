import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthResolver } from 'src/auth/auth.resolver';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, CustomerService, AuthResolver, PrismaService],
})
export class AuthModule {}
