"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(users) {
        this.users = users;
    }
    login(email, password) {
        const user = this.users.findByEmail(email);
        if (!user)
            return null;
        // Demo: compare plain text. In production, use bcrypt.
        if (user.password !== password)
            return null;
        const { id, fullName, role } = user;
        return { id, fullName, email: user.email, role };
    }
    register(input) {
        const exists = this.users.findByEmail(input.email);
        if (exists)
            return null;
        const created = this.users.create({
            fullName: input.fullName,
            email: input.email,
            password: input.password,
            address: input.address,
            isActive: true,
            role: 'user'
        });
        const { id, fullName, role } = created;
        return { id, fullName, email: created.email, role };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map