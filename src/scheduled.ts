import { DiscordClient } from "./clients/discord";
import { EventsRepository } from "./repositories/eventsRepository";
type Bindings = {
  DB: D1Database;
  DISCORD_TOKEN: string;
  MOKUMOKU_CHANNEL_ID: string;
};

const scheduled: ExportedHandler<Bindings>["scheduled"] = async (
  event,
  env,
) => {
  const eventsRepository = new EventsRepository(env.DB);

  // もくもく会が開催されている日のみ実行
  const todayEvent = await eventsRepository.findTodayEvent();
  if (!todayEvent) {
    return;
  }

  const client = new DiscordClient(env.DISCORD_TOKEN);

  switch (event.cron) {
    case "0 6 * * *":
      client.sendMessage({
        channelId: env.MOKUMOKU_CHANNEL_ID,
        content:
          "@here テックトークの時間です！発表希望者はこのメッセージに🙋‍♂️でリアクションしてください。",
      });
      break;
    case "50 8 * * * ":
      client.sendMessage({
        channelId: env.MOKUMOKU_CHANNEL_ID,
        content:
          "@here もくもく会終了の時間です！今日の成果を共有しましょう！🍻",
      });
      break;
  }
};

export default scheduled;
