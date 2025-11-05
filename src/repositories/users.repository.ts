import type { User } from '../models/user';
import { Database } from '../core/database';

export class UsersRepository {
  constructor(private db: Database) {}

  findAll(): User[] {
    return this.db.snapshot.users as User[];
  }

  findByEmail(email: string): User | undefined {
    return this.findAll().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  ensurePasswords(defaultPassword = 'Password123!') {
    const users = this.findAll();
    let changed = false;
    for (const u of users) {
      if (!('password' in u) || !u.password) {
        (u as any).password = defaultPassword;
        changed = true;
      }
    }
    if (changed) {
      this.db.set('users', users);
      this.db.save();
    }
  }
}
