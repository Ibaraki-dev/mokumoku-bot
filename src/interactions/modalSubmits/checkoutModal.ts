import { CHECKOUT_MODAL_CUSTOM_ID } from "../../constants";
import { buildCheckoutModalSubmitResponse } from "../../responses/checkoutModalSubmitResponse";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import { getModalTextInputValue } from "./getModalTextInputValue";

const handler = async ({
  modalSubmitObj,
  repositories: { usersRepository, checkoutsRepository },
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!(modalSubmitObj.member && modalSubmitObj.data)) {
    throw new Error("Invalid interaction");
  }
  const content = getModalTextInputValue(modalSubmitObj.data.components[1]);

  const user =
    (await usersRepository.findUserByDiscordUserId(
      modalSubmitObj.member.user.id,
    )) ??
    (await usersRepository.create({
      name: modalSubmitObj.member.user.username,
      discordUserId: modalSubmitObj.member.user.id,
    }));
  const checkout = await checkoutsRepository.create({
    userId: user.id,
    content,
  });

  return buildCheckoutModalSubmitResponse({
    member: modalSubmitObj.member,
    content,
    checkoutId: checkout.id,
  });
};

export default {
  customId: CHECKOUT_MODAL_CUSTOM_ID,
  handler,
};
