import { CHECKIN_MODAL_CUSTOM_ID } from "../../constants";
import { CheckinsRepository } from "../../repositories/checkinsRepository";
import { UsersRepository } from "../../repositories/usersRepository";
import { buildCheckinModalSubmitResponse } from "../../responses/checkinModalSubmitResponse";
import { ModalSubmitObj } from "../handleModalSubmit";

const handler = async ({
  intentObj,
  usersRepository: userRepository,
  checkinsRepository,
}: {
  intentObj: ModalSubmitObj;
  usersRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
}) => {
  if (!(intentObj.member && intentObj.data)) {
    throw new Error("Invalid interaction");
  }

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
};

export default {
  customId: CHECKIN_MODAL_CUSTOM_ID,
  handler,
};
