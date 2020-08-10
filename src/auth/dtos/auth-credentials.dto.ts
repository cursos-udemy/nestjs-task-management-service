import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  //Passwords will contain at least 1 upper case letter
  //Passwords will contain at least 1 lower case letter
  //Passwords will contain at least 1 number or special character
  //There is no length validation (min, max) in this regex!
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'the password does not satisfy the expected standard'})
  password: string;
}