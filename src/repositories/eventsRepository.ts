import dayjs from "dayjs";
import { desc, eq } from "drizzle-orm";
import { events } from "../schema";
import { BaseRepository } from "./baseRepository";

export class EventsRepository extends BaseRepository {
  async findTodayEvent() {
    return await this.db.query.events.findFirst({
      where: eq(events.date, dayjs().tz().format("YYYY-MM-DD")),
    });
  }

  async findLatestEvent() {
    return await this.db.query.events.findFirst({
      orderBy: [desc(events.createdAt)],
    });
  }

  async findLatestEventWithCheckins() {
    return await this.db.query.events.findFirst({
      orderBy: [desc(events.createdAt)],
      with: {
        eventsToCheckins: {
          with: {
            checkin: true,
          },
        },
      },
    });
  }

  async create({
    name,
    schedule,
  }: {
    name: string;
    schedule: string;
  }) {
    await this.db.insert(events).values({
      name,
      schedule,
      date: dayjs().tz().format("YYYY-MM-DD"),
      createdAt: dayjs().tz().format(),
    });
  }
}
