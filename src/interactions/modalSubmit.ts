import {
  APIBaseInteraction,
  APIModalSubmission,
  InteractionType,
} from "discord-api-types/v10";
import { CHECKIN_MODAL_CUSTOM_ID } from "../constants";
import { CheckinsRepository } from "../repositories/checkinsRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { buildCheckinModalSubmitResponse } from "../responses/checkinModalSubmitResponse";

export const handleModalSubmit = async ({
  intentObj,
  userRepository,
  checkinsRepository,
}: {
  intentObj: APIBaseInteraction<
    InteractionType.ModalSubmit,
    APIModalSubmission
  >;
  userRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
}) => {
  if (!intentObj.member) {
    throw new Error("Invalid interaction");
  }

  switch (intentObj.data?.custom_id) {
    case CHECKIN_MODAL_CUSTOM_ID: {
      const profile = intentObj.data.components[0].components[0].value;
      const todo = intentObj.data.components[1].components[0].value;

      let targetUsers = await userRepository.findByDiscordUserId(
        intentObj.member.user.id,
      );

      if (targetUsers.length === 0) {
        targetUsers = await userRepository.create({
          name: intentObj.member.user.username,
          discordUserId: intentObj.member.user.id,
        });
      }
      await checkinsRepository.create({
        userId: targetUsers[0].id,
        profile,
        todo,
      });

      return buildCheckinModalSubmitResponse({
        member: intentObj.member,
        profile,
        todo,
      });
    }
    default:
      throw new Error("Invalid interaction");
  }
};
