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
    findById(id) {
        return this.findAll().find(u => u.id === id);
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
    create(userInput) {
        const users = this.findAll();
        const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const created = { ...userInput, id: nextId, createdAt: new Date().toISOString() };
        users.push(created);
        this.db.set('users', users);
        this.db.save();
        return created;
    }
    updateRole(id, role) {
        const users = this.findAll();
        const idx = users.findIndex(u => u.id === id);
        if (idx === -1)
            return null;
        users[idx] = { ...users[idx], role };
        this.db.set('users', users);
        this.db.save();
        return users[idx];
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map