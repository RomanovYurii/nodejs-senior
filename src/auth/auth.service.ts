import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/auth.dto';
import { ROLES } from 'src/consts';

@Injectable()
export class AuthService {
  constructor(private readonly customerService: CustomerService) {}

  async signUp(input: SignUpDto): Promise<boolean> {
    const { email, password } = input;
    const existingCustomer = await this.customerService.findOne({
      where: { email },
    });
    if (existingCustomer) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.customerService.create({
      email,
      password: hashedPassword,
      role: ROLES.User,
    });

    return true;
  }

  async signIn(email: string, password: string): Promise<boolean> {
    const customer = await this.customerService.findOne({ where: { email } });
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

    // TODO: Generate and return authentication tokens (e.g., JWT)

    return true;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
