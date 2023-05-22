import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  GetCustomerInput,
  UpdateCustomerInput,
} from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(
    @Args('data') { skip, take, where }: GetCustomerInput,
  ): Promise<Customer[]> {
    return this.customerService.findAll({ skip, take, where });
  }

  @Query(() => Customer)
  async customer(@Args('id') id: string): Promise<Customer | null> {
    return this.customerService.findById(id);
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    return this.customerService.create(input);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: string,
    @Args('input') input: UpdateCustomerInput,
  ): Promise<Customer | null> {
    return this.customerService.update(id, input);
  }

  @Mutation(() => Customer)
  async deleteCustomer(@Args('id') id: string): Promise<Customer | null> {
    return this.customerService.delete(id);
  }
}
