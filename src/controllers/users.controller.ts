import type { Request, Response } from 'express';
import { Database } from '../core/database';
import { UsersRepository } from '../repositories/users.repository';

const db = new Database('../db/db.json');
const usersRepo = new UsersRepository(db);

export const changeRole = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { role } = req.body as { role?: 'admin' | 'user' };

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, message: 'invalid user id' });
  }

  if (role !== 'admin' && role !== 'user') {
    return res.status(400).json({ success: false, message: "role must be 'admin' or 'user'" });
  }

  const updated = usersRepo.updateRole(id, role);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'user not found' });
  }

  const { fullName, email } = updated;
  return res.json({ success: true, user: { id, fullName, email, role: updated.role } });
};
