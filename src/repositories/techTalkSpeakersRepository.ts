import dayjs from "dayjs";
import { and, asc, eq } from "drizzle-orm";
import { techTalkSpeakers } from "../schema";
import { BaseRepository } from "./baseRepository";

export class TechTalkSpeakersRepository extends BaseRepository {
  async join({
    messageId,
    discordUserId,
    displayName,
  }: {
    messageId: string;
    discordUserId: string;
    displayName: string;
  }) {
    await this.db
      .insert(techTalkSpeakers)
      .values({
        messageId,
        discordUserId,
        displayName,
        createdAt: dayjs().tz().format(),
      })
      .onConflictDoUpdate({
        target: [techTalkSpeakers.messageId, techTalkSpeakers.discordUserId],
        set: {
          displayName,
        },
      });
  }

  async leave({
    messageId,
    discordUserId,
  }: {
    messageId: string;
    discordUserId: string;
  }) {
    await this.db
      .delete(techTalkSpeakers)
      .where(
        and(
          eq(techTalkSpeakers.messageId, messageId),
          eq(techTalkSpeakers.discordUserId, discordUserId),
        ),
      );
  }

  async listByMessageId(messageId: string) {
    return await this.db.query.techTalkSpeakers.findMany({
      where: eq(techTalkSpeakers.messageId, messageId),
      orderBy: [asc(techTalkSpeakers.createdAt), asc(techTalkSpeakers.id)],
    });
  }
}
