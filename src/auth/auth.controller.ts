import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { AccessPassport } from './interfaces/access-passport.interface';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/signup')
  public signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  public signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<AccessPassport> {
    return this.authService.signIn(authCredentialsDto);
  }
}
