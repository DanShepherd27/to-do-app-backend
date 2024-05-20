import { UUID } from 'crypto';

export class User {
  id: UUID;
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
