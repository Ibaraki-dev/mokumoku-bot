import dayjs from "dayjs";
import { checkouts } from "../schema";
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
}
