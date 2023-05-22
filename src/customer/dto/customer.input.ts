import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class GetCustomersInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where?: WhereCustomerInput;
}

@InputType()
export class GetCustomerInput {
  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  role: string;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}

@InputType()
export class DeleteCustomerInput {
  @Field(() => String, { nullable: true })
  id: string;
}

@InputType()
export class AssignRoleInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: false })
  role: 'USER' | 'ADMIN';
}
