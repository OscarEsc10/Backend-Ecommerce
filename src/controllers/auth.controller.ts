import type { Request, Response } from 'express';
import { Database } from '../core/database';
import { UsersRepository } from '../repositories/users.repository';
import { AuthService } from '../services/auth.service';

const db = new Database('../db/db.json');
const usersRepo = new UsersRepository(db);
const authService = new AuthService(usersRepo);

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) return res.status(400).json({ success: false, message: 'email and password required' });
  const result = authService.login(email, password);
  if (!result) return res.status(401).json({ success: false, message: 'invalid credentials' });
  return res.json({ success: true, user: result });
};

export const register = (req: Request, res: Response) => {
  const { fullName, email, password, address } = req.body as { fullName: string; email: string; password: string; address: any };
  if (!fullName || !email || !password || !address) return res.status(400).json({ success: false, message: 'fullName, email, password and address required' });
  const created = authService.register({ fullName, email, password, address } as any);
  if (!created) return res.status(409).json({ success: false, message: 'email already exists' });
  return res.status(201).json({ success: true, user: created });
};
