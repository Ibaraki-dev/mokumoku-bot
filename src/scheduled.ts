import { DiscordClient } from "./clients/discord";
import { EventsRepository } from "./repositories/eventsRepository";
import { buildTechTalkAnnouncementMessage } from "./responses/techTalkAnnouncementResponse";

type Bindings = {
  DB: D1Database;
  DISCORD_TOKEN: string;
  MOKUMOKU_CHANNEL_ID: string;
};

const scheduled: ExportedHandler<Bindings>["scheduled"] = async (
  event,
  env,
) => {
  const client = new DiscordClient(env.DISCORD_TOKEN);

  const eventsRepository = new EventsRepository(env.DB);
  const isEventDay = !!(await eventsRepository.findTodayEvent());

  switch (event.cron) {
    case "0 6 * * SAT,SUN":
      if (isEventDay) {
        await client.sendMessage({
          channelId: env.MOKUMOKU_CHANNEL_ID,
          body: buildTechTalkAnnouncementMessage(),
        });
      }
      break;
    case "50 8 * * SAT,SUN":
      if (isEventDay) {
        await client.sendMessage({
          channelId: env.MOKUMOKU_CHANNEL_ID,
          body: {
            content:
              "@here \nもくもく会終了の時間です！今日の成果を共有しましょう！🍻",
          },
        });
      }
      break;
  }
};

export default scheduled;
