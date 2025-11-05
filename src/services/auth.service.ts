import { UsersRepository } from '../repositories/users.repository';
import type { User } from '../models/user';

export class AuthService {
  constructor(private users: UsersRepository) {}

  login(email: string, password: string): Pick<User, 'id'|'fullName'|'email'|'role'> | null {
    const user = this.users.findByEmail(email);
    if (!user) return null;
    // Demo: compare plain text. In production, use bcrypt.
    if (user.password !== password) return null;
    const { id, fullName, role } = user;
    return { id, fullName, email: user.email, role };
  }
}
