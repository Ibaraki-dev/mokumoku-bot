import { InteractionResponseType } from "discord-api-types/v10";
import { EDIT_CHECKIN_CUSTOM_ID } from "../../constants";
import { buildCheckinModalSubmitResponse } from "../../responses/checkinModalSubmitResponse";
import { ephemeralResponse } from "../../responses/ephemeralResponse";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import { parseCustomId } from "../parseCustomId";
import { getModalTextInputValue } from "./getModalTextInputValue";

const handler = async ({
  modalSubmitObj,
  repositories: { checkinsRepository },
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!(modalSubmitObj.member && modalSubmitObj.data)) {
    throw new Error("Invalid interaction");
  }

  const checkinId = parseCustomId(
    modalSubmitObj.data.custom_id,
    EDIT_CHECKIN_CUSTOM_ID,
  );
  const checkin = await checkinsRepository.findByIdWithUser(checkinId);
  if (!checkin || checkin.discordUserId !== modalSubmitObj.member.user.id) {
    return ephemeralResponse("自分のチェックインだけ編集できます。");
  }

  const profile = getModalTextInputValue(modalSubmitObj.data.components[0]);
  const todo = getModalTextInputValue(modalSubmitObj.data.components[1]);

  await checkinsRepository.update({
    id: checkinId,
    profile,
    todo,
  });

  return buildCheckinModalSubmitResponse({
    member: modalSubmitObj.member,
    profile,
    todo,
    checkinId,
    responseType: InteractionResponseType.UpdateMessage,
  });
};

export default {
  customId: EDIT_CHECKIN_CUSTOM_ID,
  handler,
};
