"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeRole = void 0;
const database_1 = require("../core/database");
const users_repository_1 = require("../repositories/users.repository");
const db = new database_1.Database('../db/db.json');
const usersRepo = new users_repository_1.UsersRepository(db);
const changeRole = (req, res) => {
    const id = Number(req.params.id);
    const { role } = req.body;
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
exports.changeRole = changeRole;
//# sourceMappingURL=users.controller.js.map