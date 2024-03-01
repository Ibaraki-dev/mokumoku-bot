import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { events } from "../schema";
import { BaseRepository } from "./baseRepository";

export class EventsRepository extends BaseRepository {
  async findTodayEvent() {
    const targetEvents = await this.db
      .select()
      .from(events)
      .where(eq(events.date, dayjs().tz().format("YYYY-MM-DD")));
    return targetEvents.length > 0 ? targetEvents[0] : null;
  }

  async create({
    name,
  }: {
    name: string;
  }) {
    await this.db.insert(events).values({
      name,
      date: dayjs().tz().format("YYYY-MM-DD"),
      createdAt: dayjs().tz().format(),
    });
  }
}
