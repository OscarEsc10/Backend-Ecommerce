"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const database_1 = require("../core/database");
const users_repository_1 = require("../repositories/users.repository");
const auth_service_1 = require("../services/auth.service");
const db = new database_1.Database('../db/db.json');
const usersRepo = new users_repository_1.UsersRepository(db);
const authService = new auth_service_1.AuthService(usersRepo);
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ success: false, message: 'email and password required' });
    const result = authService.login(email, password);
    if (!result)
        return res.status(401).json({ success: false, message: 'invalid credentials' });
    return res.json({ success: true, user: result });
};
exports.login = login;
const register = (req, res) => {
    const { fullName, email, password, address } = req.body;
    if (!fullName || !email || !password || !address)
        return res.status(400).json({ success: false, message: 'fullName, email, password and address required' });
    const created = authService.register({ fullName, email, password, address });
    if (!created)
        return res.status(409).json({ success: false, message: 'email already exists' });
    return res.status(201).json({ success: true, user: created });
};
exports.register = register;
//# sourceMappingURL=auth.controller.js.map