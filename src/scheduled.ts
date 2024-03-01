import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { DiscordClient } from "./clients/discord";
import { EventsRepository } from "./repositories/eventsRepository";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

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
    case "0 6 * * *":
      if (isEventDay) {
        await client.sendMessage({
          channelId: env.MOKUMOKU_CHANNEL_ID,
          body: {
            content:
              "@here テックトークの時間です！発表希望者はこのメッセージに🙋‍♂️でリアクションしてください。",
          },
        });
      }
      break;
    case "50 8 * * *":
      if (isEventDay) {
        await client.sendMessage({
          channelId: env.MOKUMOKU_CHANNEL_ID,
          body: {
            content:
              "@here もくもく会終了の時間です！今日の成果を共有しましょう！🍻",
          },
        });
      }
      break;
  }
};

export default scheduled;
