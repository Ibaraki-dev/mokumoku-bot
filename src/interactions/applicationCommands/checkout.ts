import { CHECKOUT_COMMAND_NAME } from "../../constants";
import { buildCheckoutModalResponse } from "../../responses/checkoutModalResponse";
import { Repositories } from "../../types";
import { ApplicationCommandObj } from "../handleApplicationCommands";

const handler = async ({
  intentObj,
  repositories: { usersRepository },
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
}) => {
  if (!intentObj.member) {
    throw new Error("Invalid interaction");
  }

  const todayCheckin = await usersRepository.findTodayCheckinByDiscordUserId(
    intentObj.member.user.id,
  );

  return buildCheckoutModalResponse({
    todo: todayCheckin?.todo || "",
  });
};

export default {
  commandName: CHECKOUT_COMMAND_NAME,
  handler,
};
