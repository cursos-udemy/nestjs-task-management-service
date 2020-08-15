import { EntityRepository, Repository } from 'typeorm/index';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  private logger = new Logger(UserRepository.name);

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const saltRounds = 10;
    const user = this.create();
    user.username = username;
    user.salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error(`Username '${username}' already exists`, error.stack);
        throw new ConflictException(`Username '${username}' already exists`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && this.validatePassword(password, user)) {
      return username;
    }
    return null;
  }

  private validatePassword(password: string, user: User) {
    const passwordHash = bcrypt.hashSync(password, user.salt);
    return passwordHash === user.password;
  }
}