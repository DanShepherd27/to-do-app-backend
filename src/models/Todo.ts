import { UUID, randomUUID } from 'crypto';

export class Todo {
  id: UUID;
  userId: UUID;
  title: string;
  status: boolean;

  constructor(userId: UUID, title: string, status: boolean, id?: UUID) {
    this.userId = userId;
    this.title = title;
    this.status = status;
    this.id = id ?? randomUUID();
  }
}
