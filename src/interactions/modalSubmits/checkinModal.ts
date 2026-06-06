import { CHECKIN_MODAL_CUSTOM_ID } from "../../constants";
import { buildCheckinModalSubmitResponse } from "../../responses/checkinModalSubmitResponse";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import { getModalTextInputValue } from "./getModalTextInputValue";

const handler = async ({
  modalSubmitObj,
  repositories: {
    usersRepository,
    eventsRepository,
    checkinsRepository,
    eventsToCheckinsRepository,
  },
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!(modalSubmitObj.member && modalSubmitObj.data)) {
    throw new Error("Invalid interaction");
  }
  const todayEvent = await eventsRepository.findTodayEvent();
  if (!todayEvent) {
    throw new Error(
      "もくもく会が開始されていません。チェックインの前に`/mokumoku-start`を実行してください。",
    );
  }

  const profile = getModalTextInputValue(modalSubmitObj.data.components[0]);
  const todo = getModalTextInputValue(modalSubmitObj.data.components[1]);

  const user =
    (await usersRepository.findUserByDiscordUserId(
      modalSubmitObj.member.user.id,
    )) ??
    (await usersRepository.create({
      name: modalSubmitObj.member.user.username,
      discordUserId: modalSubmitObj.member.user.id,
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
    member: modalSubmitObj.member,
    profile,
    todo,
    checkinId: checkin.id,
  });
};

export default {
  customId: CHECKIN_MODAL_CUSTOM_ID,
  handler,
};
