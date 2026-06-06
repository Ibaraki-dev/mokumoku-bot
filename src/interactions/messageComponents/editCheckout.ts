import { EDIT_CHECKOUT_CUSTOM_ID } from "../../constants";
import { buildEditCheckoutModalResponse } from "../../responses/editCheckoutModalResponse";
import { ephemeralResponse } from "../../responses/ephemeralResponse";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import { parseCustomId } from "../parseCustomId";

const handler = async ({
  messageComponentObj,
  repositories: { checkoutsRepository },
}: {
  messageComponentObj: MessageComponentObj;
  repositories: Repositories;
}) => {
  if (!messageComponentObj.member) {
    throw new Error("Invalid interaction");
  }

  const checkoutId = parseCustomId(
    messageComponentObj.data.custom_id,
    EDIT_CHECKOUT_CUSTOM_ID,
  );
  const checkout = await checkoutsRepository.findByIdWithUser(checkoutId);

  if (
    !checkout ||
    checkout.discordUserId !== messageComponentObj.member.user.id
  ) {
    return ephemeralResponse("自分のチェックアウトだけ編集できます。");
  }

  return buildEditCheckoutModalResponse({
    checkoutId,
    content: checkout.content,
  });
};

export default {
  customId: EDIT_CHECKOUT_CUSTOM_ID,
  handler,
};
