import dayjs from "dayjs";
import { desc, eq } from "drizzle-orm";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { checkins, users } from "../schema";

export class UsersRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(d1db: D1Database) {
    this.db = drizzle(d1db);
  }

  async findByDiscordUserId(discordUserId: string) {
    const targetUsers = await this.db
      .select()
      .from(users)
      .where(eq(users.discordUserId, discordUserId));
    return targetUsers;
  }

  async create({
    name,
    discordUserId,
  }: {
    name: string;
    discordUserId: string;
  }) {
    const newUser = await this.db
      .insert(users)
      .values({
        name,
        discordUserId,
        createdAt: dayjs().tz().format(),
      })
      .returning();
    return newUser;
  }

  async findLatestCheckinByDiscordUserId(discordUserId: string) {
    const result = await this.db
      .select({
        id: checkins.id,
        userId: checkins.userId,
        todo: checkins.todo,
        profile: checkins.profile,
        date: checkins.date,
      })
      .from(users)
      .leftJoin(checkins, eq(users.id, checkins.userId))
      .where(eq(users.discordUserId, discordUserId))
      .orderBy(desc(checkins.createdAt))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  }
}
