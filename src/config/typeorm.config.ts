import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const configDatabase = config.get('database');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: configDatabase.type,
  host: process.env.RDS_HOSTNAME || configDatabase.host,
  port: process.env.RDS_PORT || configDatabase.port,
  username: process.env.RDS_USERNAME || configDatabase.username,
  password: process.env.RDS_PASSWORD || configDatabase.password,
  database: process.env.RDS_DB_NAME || configDatabase.name,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SINC || configDatabase.synchronize
};