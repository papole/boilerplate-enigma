import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as any || 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsTableName: "migrations"
};


export default new DataSource(typeOrmConfig)
