import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseCustomer, Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  AssignRoleInput,
  CreateCustomerInput,
  DeleteCustomerInput,
  GetCustomerInput,
  GetCustomersInput,
  UpdateCustomerInput,
} from './dto/customer.input';
import { ConflictException, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';

@Resolver(() => BaseCustomer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [BaseCustomer])
  @UseGuards(AuthGuard)
  async customers(@Args('data') data?: GetCustomersInput) {
    return this.customerService.findAll(data);
  }

  @Query(() => BaseCustomer)
  @UseGuards(AuthGuard)
  async customer(@Args('data') { where }: GetCustomerInput) {
    return this.customerService.findOne({ where });
  }

  @Mutation(() => BaseCustomer)
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    const existingCustomer = await this.customerService.findOne({
      where: input,
    });
    if (existingCustomer) {
      throw new ConflictException('Email already in use');
    }
    return this.customerService.create(input);
  }

  @Mutation(() => BaseCustomer)
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  async updateCustomer(
    @Args('input') input: UpdateCustomerInput,
  ): Promise<Customer | null> {
    return this.customerService.update(input);
  }

  @Mutation(() => BaseCustomer)
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  async deleteCustomer(
    @Args('input') input: DeleteCustomerInput,
  ): Promise<Customer | null> {
    return this.customerService.delete(input);
  }

  @Mutation(() => BaseCustomer)
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  async assignRole(
    @Args('input') input: AssignRoleInput,
  ): Promise<Customer | null> {
    return this.customerService.update(input);
  }
}
