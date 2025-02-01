import { CHECKOUT_MODAL_CUSTOM_ID } from "../../constants";
import { buildCheckoutModalSubmitResponse } from "../../responses/checkoutModalSubmitResponse";
import { Repositories } from "../../types";
import { ModalSubmitObj } from "../handleModalSubmit";

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
  const todo = modalSubmitObj.data.components[0].components[0].value;
  const content = modalSubmitObj.data.components[1].components[0].value;

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
  });
};

export default {
  customId: CHECKOUT_MODAL_CUSTOM_ID,
  handler,
};
