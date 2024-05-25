import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Todo } from '../models/Todo';
import 'dotenv/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT!),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Todo],
        synchronize: process.env.DB_SYNCHRONIZE as unknown as boolean,
      });

      return dataSource.initialize();
    },
  },
];
