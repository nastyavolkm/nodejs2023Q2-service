import { DatabaseType } from 'typeorm';

const postgresDatabase: DatabaseType = 'postgres';

export default {
  type: postgresDatabase,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
};
