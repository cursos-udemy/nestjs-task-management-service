import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const configSecurity = config.get('security')

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: configSecurity.strategy,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || configSecurity.token.secret,
      signOptions: {
        expiresIn: configSecurity.token.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})
export class AuthModule {
}
