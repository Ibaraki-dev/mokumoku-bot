import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

export class BaseRepository {
  protected db: DrizzleD1Database<Record<string, never>>;

  constructor(d1db: D1Database) {
    this.db = drizzle(d1db);
  }
}
