import { EDIT_MOKUMOKU_START_CUSTOM_ID } from "../../constants";
import { buildEditMokumokuStartModalResponse } from "../../responses/editMokumokuStartModalResponse";
import { ephemeralResponse } from "../../responses/ephemeralResponse";
import { defaultMokumokuStartFormat } from "../../responses/mokumokuStartCommandResponse";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import { isAdmin } from "../isAdmin";

const handler = async ({
  messageComponentObj,
  repositories: { mokumokuStartFormatsRepository },
}: {
  messageComponentObj: MessageComponentObj;
  repositories: Repositories;
}) => {
  if (!messageComponentObj.member || !isAdmin(messageComponentObj.member)) {
    return ephemeralResponse("管理者だけが開始投稿を編集できます。");
  }

  const format =
    (await mokumokuStartFormatsRepository.find()) ?? defaultMokumokuStartFormat;

  return buildEditMokumokuStartModalResponse({ format });
};

export default {
  customId: EDIT_MOKUMOKU_START_CUSTOM_ID,
  handler,
};
