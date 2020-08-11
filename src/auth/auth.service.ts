import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AccessPassport } from './interfaces/access-passport.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AccessPassport> {
    const username = await this.userRepository.signIn(authCredentialsDto);
    if (!username) throw new UnauthorizedException('Invalid credentials');
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
