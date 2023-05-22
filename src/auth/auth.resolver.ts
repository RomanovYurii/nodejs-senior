import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async signUp(@Args('input') input: SignUpDto): Promise<boolean> {
    try {
      await this.authService.signUp(input);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Boolean)
  async signIn(@Args('input') input: SignInDto): Promise<boolean> {
    try {
      await this.authService.signIn(input.email, input.password);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
