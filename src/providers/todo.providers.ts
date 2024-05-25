import { Todo } from 'src/models/Todo';
import { DataSource } from 'typeorm';

export const todoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: ['DATA_SOURCE'],
  },
];
