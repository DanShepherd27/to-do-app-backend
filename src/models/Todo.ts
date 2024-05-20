import { UUID } from 'crypto';

export class Todo {
  userId: UUID;
  title: string;
  status: boolean;
}
