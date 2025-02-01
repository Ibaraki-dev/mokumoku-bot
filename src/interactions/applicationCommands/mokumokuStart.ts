import { MOKUMOKU_START_COMMAND_NAME } from "../../constants";
import { errorResponse } from "../../responses/errorResponse";
import { buildMokumokuStartCommandResponse } from "../../responses/mokumokuStartCommandResponse";
import { Repositories } from "../../types";

const handler = async ({
  repositories: { eventsRepository },
}: {
  repositories: Repositories;
}) => {
  const event = await eventsRepository.findTodayEvent();

  if (event) {
    return errorResponse("今日のイベントはすでに作成されています");
  }

  const latestEvent = await eventsRepository.findLatestEvent();

  return buildMokumokuStartCommandResponse({
    prevName: latestEvent?.name,
    prevSchedule: latestEvent?.schedule,
  });
};

export default {
  commandName: MOKUMOKU_START_COMMAND_NAME,
  handler,
};
