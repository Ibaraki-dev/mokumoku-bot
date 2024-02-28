import { eventsToCheckins } from "../schema";
import { BaseRepository } from "./baseRepository";

export class EventsToCheckinsRepository extends BaseRepository {
  async create({
    eventId,
    checkinId,
  }: {
    eventId: number;
    checkinId: number;
  }) {
    return (
      await this.db
        .insert(eventsToCheckins)
        .values({
          eventId,
          checkinId,
        })
        .returning()
    )[0];
  }
}
