import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}