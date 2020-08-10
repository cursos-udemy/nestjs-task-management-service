import { EntityRepository, Repository } from 'typeorm/index';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    return user.save();
  }
}