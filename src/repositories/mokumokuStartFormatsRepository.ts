import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { mokumokuStartFormats } from "../schema";
import { BaseRepository } from "./baseRepository";

export type MokumokuStartFormat = {
  contentTemplate: string;
  schedule: string;
  checkinCommand: string;
  checkoutCommand: string;
};

const SINGLETON_ID = 1;

export class MokumokuStartFormatsRepository extends BaseRepository {
  async find() {
    return await this.db.query.mokumokuStartFormats.findFirst({
      where: eq(mokumokuStartFormats.id, SINGLETON_ID),
    });
  }

  async upsert(format: MokumokuStartFormat) {
    return (
      await this.db
        .insert(mokumokuStartFormats)
        .values({
          id: SINGLETON_ID,
          ...format,
          createdAt: dayjs().tz().format(),
          updatedAt: dayjs().tz().format(),
        })
        .onConflictDoUpdate({
          target: mokumokuStartFormats.id,
          set: {
            ...format,
            updatedAt: dayjs().tz().format(),
          },
        })
        .returning()
    )[0];
  }
}
