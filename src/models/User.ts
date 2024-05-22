import { UUID, randomUUID } from 'crypto';

export class User {
  id: UUID;
  username: string;

  constructor(username: string, id?: UUID) {
    this.username = username;
    this.id = id ?? randomUUID();
  }
}
