import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/auth.dto';
import { ROLES } from 'src/consts';
import { TokenService } from 'src/auth/token.service';

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(input: SignUpDto): Promise<AuthResponse> {
    const { email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    const accessToken = await this.tokenService.generateAccessToken({ email });
    const refreshToken = await this.tokenService.generateRefreshToken();

    const existingCustomer = await this.customerService.findOne({
      where: { email },
    });
    if (existingCustomer) {
      throw new Error('Email already in use');
    }

    await this.customerService.create({
      email,
      password: hashedPassword,
      role: ROLES.User,
      refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const accessToken = await this.tokenService.generateAccessToken({ email });
    const refreshToken = await this.tokenService.generateRefreshToken();

    const customer = await this.customerService.findOne({
      where: { email },
    });
    if (!customer) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      customer.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    await this.customerService.update({ id: customer.id, refreshToken });

    return { accessToken, refreshToken };
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
