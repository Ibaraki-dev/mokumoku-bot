import { InteractionResponseType } from "discord-api-types/v10";
import { EDIT_CHECKOUT_CUSTOM_ID } from "../../constants";
import { buildCheckoutModalSubmitResponse } from "../../responses/checkoutModalSubmitResponse";
import { ephemeralResponse } from "../../responses/ephemeralResponse";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import { parseCustomId } from "../parseCustomId";
import { getModalTextInputValue } from "./getModalTextInputValue";

const handler = async ({
  modalSubmitObj,
  repositories: { checkoutsRepository },
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!(modalSubmitObj.member && modalSubmitObj.data)) {
    throw new Error("Invalid interaction");
  }

  const checkoutId = parseCustomId(
    modalSubmitObj.data.custom_id,
    EDIT_CHECKOUT_CUSTOM_ID,
  );
  const checkout = await checkoutsRepository.findByIdWithUser(checkoutId);
  if (!checkout || checkout.discordUserId !== modalSubmitObj.member.user.id) {
    return ephemeralResponse("自分のチェックアウトだけ編集できます。");
  }

  const content = getModalTextInputValue(modalSubmitObj.data.components[0]);

  await checkoutsRepository.update({
    id: checkoutId,
    content,
  });

  return buildCheckoutModalSubmitResponse({
    member: modalSubmitObj.member,
    content,
    checkoutId,
    responseType: InteractionResponseType.UpdateMessage,
  });
};

export default {
  customId: EDIT_CHECKOUT_CUSTOM_ID,
  handler,
};
