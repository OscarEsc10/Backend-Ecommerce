"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Database {
    constructor(relativePath = '../db/db.json') {
        this.filePath = (0, path_1.resolve)(__dirname, relativePath);
        this.data = this.read();
    }
    read() {
        const raw = (0, fs_1.readFileSync)(this.filePath, 'utf-8');
        return JSON.parse(raw);
    }
    get snapshot() {
        return this.data;
    }
    set(path, value) {
        const parts = path.split('.');
        let cursor = this.data;
        for (let i = 0; i < parts.length - 1; i++) {
            const key = parts[i];
            if (!(key in cursor))
                cursor[key] = {};
            cursor = cursor[key];
        }
        cursor[parts[parts.length - 1]] = value;
    }
    save() {
        (0, fs_1.writeFileSync)(this.filePath, JSON.stringify(this.data, null, 2));
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map