import { EDIT_CHECKIN_CUSTOM_ID } from "../../constants";
import { buildEditCheckinModalResponse } from "../../responses/editCheckinModalResponse";
import { ephemeralResponse } from "../../responses/ephemeralResponse";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import { parseCustomId } from "../parseCustomId";

const handler = async ({
  messageComponentObj,
  repositories: { checkinsRepository },
}: {
  messageComponentObj: MessageComponentObj;
  repositories: Repositories;
}) => {
  if (!messageComponentObj.member) {
    throw new Error("Invalid interaction");
  }

  const checkinId = parseCustomId(
    messageComponentObj.data.custom_id,
    EDIT_CHECKIN_CUSTOM_ID,
  );
  const checkin = await checkinsRepository.findByIdWithUser(checkinId);

  if (
    !checkin ||
    checkin.discordUserId !== messageComponentObj.member.user.id
  ) {
    return ephemeralResponse("自分のチェックインだけ編集できます。");
  }

  return buildEditCheckinModalResponse({
    checkinId,
    profile: checkin.profile,
    todo: checkin.todo,
  });
};

export default {
  customId: EDIT_CHECKIN_CUSTOM_ID,
  handler,
};
