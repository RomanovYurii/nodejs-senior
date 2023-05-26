import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signUp(@Args('input') input: SignUpDto): Promise<string> {
    try {
      return JSON.stringify(await this.authService.signUp(input));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => String)
  async signIn(@Args('input') input: SignInDto): Promise<string> {
    try {
      return JSON.stringify(
        await this.authService.signIn(input.email, input.password),
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
