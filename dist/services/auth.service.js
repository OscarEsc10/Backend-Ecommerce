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
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map