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

  register(input: Pick<User, 'fullName' | 'email' | 'password' | 'address'>): Pick<User, 'id'|'fullName'|'email'|'role'> | null {
    const exists = this.users.findByEmail(input.email);
    if (exists) return null;
    const created = this.users.create({
      fullName: input.fullName,
      email: input.email,
      password: input.password,
      address: input.address,
      isActive: true,
      role: 'user'
    } as Omit<User, 'id'|'createdAt'>);
    const { id, fullName, role } = created;
    return { id, fullName, email: created.email, role };
  }
}
