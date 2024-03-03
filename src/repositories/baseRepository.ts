import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import * as schema from "../schema";

export class BaseRepository {
  protected db: DrizzleD1Database<typeof schema>;

  constructor(d1db: D1Database) {
    this.db = drizzle(d1db, { schema });
  }
}
