import { CHECKIN_COMMAND_NAME } from "../../constants";
import { buildCheckinModalResponse } from "../../responses/checkinCommandResponse";
import { Repositories } from "../../types";
import { ApplicationCommandObj } from "../handleApplicationCommands";

const handler = async ({
  intentObj,
  repositories: { usersRepository, eventsRepository },
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
}) => {
  if (!intentObj.member) {
    throw new Error("Invalid interaction");
  }

  const todayEvent = await eventsRepository.findTodayEvent();
  if (!todayEvent) {
    throw new Error(
      "もくもく会が開始されていません。チェックインの前に`/mokumoku-start`を実行してください。",
    );
  }

  const prevCheckin = await usersRepository.findLatestCheckinByDiscordUserId(
    intentObj.member.user.id,
  );

  return buildCheckinModalResponse(prevCheckin?.profile ?? undefined);
};

export default {
  commandName: CHECKIN_COMMAND_NAME,
  handler,
};
