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

  findById(id: number): User | undefined {
    return this.findAll().find(u => u.id === id);
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

  create(userInput: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.findAll();
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const created: User = { ...userInput, id: nextId, createdAt: new Date().toISOString() };
    users.push(created);
    this.db.set('users', users);
    this.db.save();
    return created;
  }

  updateRole(id: number, role: 'admin' | 'user'): User | null {
    const users = this.findAll();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], role };
    this.db.set('users', users);
    this.db.save();
    return users[idx];
  }
}
