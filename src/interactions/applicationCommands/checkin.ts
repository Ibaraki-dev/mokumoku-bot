import { CHECKIN_COMMAND_NAME } from "../../constants";
import { UsersRepository } from "../../repositories/usersRepository";
import { buildCheckinModalResponse } from "../../responses/checkinCommandResponse";
import { ApplicationCommandObj } from "../handleApplicationCommands";

const handler = async ({
  intentObj,
  userRepository,
}: {
  intentObj: ApplicationCommandObj;
  userRepository: UsersRepository;
}) => {
  if (!intentObj.member) {
    throw new Error("Invalid interaction");
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
