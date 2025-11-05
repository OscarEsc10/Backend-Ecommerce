"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
class UsersRepository {
    constructor(db) {
        this.db = db;
    }
    findAll() {
        return this.db.snapshot.users;
    }
    findByEmail(email) {
        return this.findAll().find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    ensurePasswords(defaultPassword = 'Password123!') {
        const users = this.findAll();
        let changed = false;
        for (const u of users) {
            if (!('password' in u) || !u.password) {
                u.password = defaultPassword;
                changed = true;
            }
        }
        if (changed) {
            this.db.set('users', users);
            this.db.save();
        }
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map