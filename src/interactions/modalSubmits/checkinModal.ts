import { CHECKIN_MODAL_CUSTOM_ID } from "../../constants";
import { buildCheckinModalSubmitResponse } from "../../responses/checkinModalSubmitResponse";
import { Repositories } from "../../types";
import { ModalSubmitObj } from "../handleModalSubmit";

const handler = async ({
  intentObj,
  repositories: {
    usersRepository,
    eventsRepository,
    checkinsRepository,
    eventsToCheckinsRepository,
  },
}: {
  intentObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!(intentObj.member && intentObj.data)) {
    throw new Error("Invalid interaction");
  }
  const todayEvent = await eventsRepository.findTodayEvent();
  if (!todayEvent) {
    throw new Error(
      "もくもく会が開始されていません。チェックインの前に`/mokumoku-start`を実行してください。",
    );
  }

  const profile = intentObj.data.components[0].components[0].value;
  const todo = intentObj.data.components[1].components[0].value;

  const user =
    (await usersRepository.findUserByDiscordUserId(intentObj.member.user.id)) ??
    (await usersRepository.create({
      name: intentObj.member.user.username,
      discordUserId: intentObj.member.user.id,
    }));
  const checkin = await checkinsRepository.create({
    userId: user.id,
    profile,
    todo,
  });
  await eventsToCheckinsRepository.create({
    eventId: todayEvent.id,
    checkinId: checkin.id,
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
