import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { checkins, users } from "../schema";
import { BaseRepository } from "./baseRepository";

export class CheckinsRepository extends BaseRepository {
  async create({
    userId,
    profile,
    todo,
  }: {
    userId: number;
    profile: string;
    todo: string;
  }) {
    return (
      await this.db
        .insert(checkins)
        .values({
          userId,
          profile,
          todo,
          date: dayjs().tz().format("YYYY-MM-DD"),
          createdAt: dayjs().tz().format(),
        })
        .returning()
    )[0];
  }

  async findByIdWithUser(id: number) {
    const result = await this.db
      .select({
        id: checkins.id,
        userId: checkins.userId,
        profile: checkins.profile,
        todo: checkins.todo,
        date: checkins.date,
        discordUserId: users.discordUserId,
      })
      .from(checkins)
      .innerJoin(users, eq(checkins.userId, users.id))
      .where(eq(checkins.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  }

  async update({
    id,
    profile,
    todo,
  }: {
    id: number;
    profile: string;
    todo: string;
  }) {
    return (
      await this.db
        .update(checkins)
        .set({
          profile,
          todo,
        })
        .where(eq(checkins.id, id))
        .returning()
    )[0];
  }
}
