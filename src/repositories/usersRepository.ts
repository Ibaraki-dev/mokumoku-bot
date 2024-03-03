import dayjs from "dayjs";
import { desc, eq } from "drizzle-orm";
import { checkins, users } from "../schema";
import { BaseRepository } from "./baseRepository";

export class UsersRepository extends BaseRepository {
  async findUserByDiscordUserId(discordUserId: string) {
    return await this.db.query.users.findFirst({
      where: eq(users.discordUserId, discordUserId),
    });
  }

  async create({
    name,
    discordUserId,
  }: {
    name: string;
    discordUserId: string;
  }) {
    return (
      await this.db
        .insert(users)
        .values({
          name,
          discordUserId,
          createdAt: dayjs().tz().format(),
        })
        .returning()
    )[0];
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
    return result.length > 0 ? result[0] : undefined;
  }
}
