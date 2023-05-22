import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class SignUpDto {
  @ApiProperty()
  @Field(() => String, { nullable: true })
  email: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  password: string;
}

@InputType()
export class SignInDto {
  @ApiProperty()
  @Field(() => String, { nullable: true })
  email: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  password: string;
}
