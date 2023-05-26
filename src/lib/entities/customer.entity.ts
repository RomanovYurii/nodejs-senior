import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';

@ObjectType()
export class BaseCustomer extends Base {
  @Field(() => String)
  email: string;

  @Field(() => String)
  role: string;
}

@ObjectType()
export class Customer extends BaseCustomer {
  @Field(() => String)
  password: string;
}
