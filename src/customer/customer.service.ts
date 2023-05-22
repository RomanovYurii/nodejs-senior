import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  DeleteCustomerInput,
  GetCustomerInput,
  GetCustomersInput,
  UpdateCustomerInput,
} from './dto/customer.input';
import { Customer } from 'lib/entities/customer.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: GetCustomersInput) {
    return this.prisma.customer.findMany(params);
  }

  async findOne(params: GetCustomerInput) {
    const { where } = params;

    return this.prisma.customer.findUnique({
      where,
    });
  }

  async create(input: Prisma.CustomerUpsertArgs['create']): Promise<Customer> {
    return this.prisma.customer.create({ data: input });
  }

  async update(input: UpdateCustomerInput): Promise<Customer | null> {
    return this.prisma.customer.update({
      where: { id: input.id },
      data: input,
    });
  }

  async delete(input: DeleteCustomerInput): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: input.id },
    });

    if (customer) {
      return this.prisma.customer.delete({ where: { id: input.id } });
    } else {
      throw new NotFoundException('Record to delete does not exist.');
    }
  }
}
