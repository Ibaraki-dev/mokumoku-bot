import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { checkins } from "../schema";

export class CheckinsRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(d1db: D1Database) {
    this.db = drizzle(d1db);
  }

  async create({
    userId,
    profile,
    todo,
  }: {
    userId: number;
    profile: string;
    todo: string;
  }) {
    await this.db.insert(checkins).values({
      userId,
      profile,
      todo,
    });
  }
}
