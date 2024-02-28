import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { CHECKIN_COMMAND_NAME } from "../constants";
import { UsersRepository } from "../repositories/usersRepository";
import { buildCheckinModalResponse } from "../responses/checkinCommandResponse";

export const handleApplicationCommand = async ({
  intentObj,
  userRepository,
}: {
  intentObj: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    {
      name: string;
    }
  >;
  userRepository: UsersRepository;
}) => {
  if (!intentObj.member) {
    throw new Error("Invalid interaction");
  }

  switch (intentObj.data?.name) {
    case CHECKIN_COMMAND_NAME: {
      const prevCheckin = await userRepository.findLatestCheckinByDiscordUserId(
        intentObj.member.user.id,
      );

      return buildCheckinModalResponse(prevCheckin?.profile ?? undefined);
    }
    default:
      throw new Error("Invalid interaction");
  }
};
