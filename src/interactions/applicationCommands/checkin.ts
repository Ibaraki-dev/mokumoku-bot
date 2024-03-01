import { CHECKIN_COMMAND_NAME } from "../../constants";
import { EventsRepository } from "../../repositories/eventsRepository";
import { UsersRepository } from "../../repositories/usersRepository";
import { buildCheckinModalResponse } from "../../responses/checkinCommandResponse";
import { ApplicationCommandObj } from "../handleApplicationCommands";

const handler = async ({
  intentObj,
  userRepository,
  eventsRepository,
}: {
  intentObj: ApplicationCommandObj;
  userRepository: UsersRepository;
  eventsRepository: EventsRepository;
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

  const prevCheckin = await userRepository.findLatestCheckinByDiscordUserId(
    intentObj.member.user.id,
  );

  return buildCheckinModalResponse(prevCheckin?.profile ?? undefined);
};

export default {
  commandName: CHECKIN_COMMAND_NAME,
  handler,
};
