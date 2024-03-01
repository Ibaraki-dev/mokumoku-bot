import dayjs from "dayjs";
import { checkins } from "../schema";
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
}
