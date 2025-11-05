import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export class Database {
  private filePath: string;
  private data: any;

  constructor(relativePath: string = '../db/db.json') {
    this.filePath = resolve(__dirname, relativePath);
    this.data = this.read();
  }

  private read() {
    const raw = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(raw);
  }

  public get snapshot() {
    return this.data;
  }

  public set(path: string, value: unknown) {
    const parts = path.split('.');
    let cursor: any = this.data;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (!(key in cursor)) cursor[key] = {};
      cursor = cursor[key];
    }
    cursor[parts[parts.length - 1]] = value;
  }

  public save() {
    writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }
}
