import { EntityRepository, Repository } from 'typeorm/index';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const saltRounds = 10;
    const user = new User();
    user.username = username;
    user.salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException(`Username '${username}' already exists`);
      }
      throw error;
    }
  }
}