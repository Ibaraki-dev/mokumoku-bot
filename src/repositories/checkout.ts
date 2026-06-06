import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { checkouts, users } from "../schema";
import { BaseRepository } from "./baseRepository";

export class CheckoutsRepository extends BaseRepository {
  public async create({
    userId,
    content,
  }: {
    userId: number;
    content: string;
  }) {
    return (
      await this.db
        .insert(checkouts)
        .values({
          userId,
          content,
          date: dayjs().tz().format("YYYY-MM-DD"),
          createdAt: dayjs().tz().format(),
        })
        .returning()
    )[0];
  }

  public async findByIdWithUser(id: number) {
    const result = await this.db
      .select({
        id: checkouts.id,
        userId: checkouts.userId,
        content: checkouts.content,
        date: checkouts.date,
        discordUserId: users.discordUserId,
      })
      .from(checkouts)
      .innerJoin(users, eq(checkouts.userId, users.id))
      .where(eq(checkouts.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  }

  public async update({ id, content }: { id: number; content: string }) {
    return (
      await this.db
        .update(checkouts)
        .set({
          content,
        })
        .where(eq(checkouts.id, id))
        .returning()
    )[0];
  }
}
