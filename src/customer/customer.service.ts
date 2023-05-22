import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCustomerInput } from './dto/customer.input';
import { Customer } from 'lib/entities/customer.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async findById(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  async create(input: Prisma.CustomerUpsertArgs['create']): Promise<Customer> {
    return this.prisma.customer.create({ data: input });
  }

  async update(id: string, input: Partial<Customer>): Promise<Customer | null> {
    return this.prisma.customer.update({ where: { id }, data: input });
  }

  async delete(id: string): Promise<Customer | null> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
