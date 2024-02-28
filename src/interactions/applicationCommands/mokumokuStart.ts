import dayjs from "dayjs";
import { MOKUMOKU_START_COMMAND_NAME } from "../../constants";
import { buildMokumokuCommandResponse as buildMokumokuStartCommandResponse } from "../../responses/mokumokuStartCommandResponse";
import { Repositories } from "../../types";

const handler = async ({
  repositories: { eventsRepository },
}: {
  repositories: Repositories;
}) => {
  // MEMO:
  // 同日に複数回実行された場合、errorを投げるか、重複して作成しないようにするか迷う
  // 一旦重複して作成しないようにする
  const event = await eventsRepository.findTodayEvent();
  if (!event) {
    await eventsRepository.create({ name: "もくもく会" });
  }

  const today = dayjs().tz().format("YYYY年MM月DD日");
  return buildMokumokuStartCommandResponse({ date: today });
};

export default {
  commandName: MOKUMOKU_START_COMMAND_NAME,
  handler,
};
