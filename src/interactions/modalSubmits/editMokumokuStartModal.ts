import dayjs from "dayjs";
import { InteractionResponseType } from "discord-api-types/v10";
import { EDIT_MOKUMOKU_START_CUSTOM_ID } from "../../constants";
import type { MokumokuStartFormat } from "../../repositories/mokumokuStartFormatsRepository";
import { ephemeralResponse } from "../../responses/ephemeralResponse";
import { buildMokumokuCommandResponse } from "../../responses/mokumokuStartCommandResponse";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import { isAdmin } from "../isAdmin";
import { getModalTextInputValue } from "./getModalTextInputValue";

const handler = async ({
  modalSubmitObj,
  repositories: { mokumokuStartFormatsRepository },
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!modalSubmitObj.data || !modalSubmitObj.member) {
    throw new Error("Invalid interaction");
  }
  if (!isAdmin(modalSubmitObj.member)) {
    return ephemeralResponse("管理者だけが開始投稿を編集できます。");
  }

  const format: MokumokuStartFormat = {
    contentTemplate: getModalTextInputValue(modalSubmitObj.data.components[0]),
    schedule: getModalTextInputValue(modalSubmitObj.data.components[1]),
    checkinCommand: getModalTextInputValue(modalSubmitObj.data.components[2]),
    checkoutCommand: getModalTextInputValue(modalSubmitObj.data.components[3]),
  };

  await mokumokuStartFormatsRepository.upsert(format);

  return buildMokumokuCommandResponse({
    date: dayjs().tz().format("YYYY年MM月DD日"),
    format,
    responseType: InteractionResponseType.UpdateMessage,
  });
};

export default {
  customId: EDIT_MOKUMOKU_START_CUSTOM_ID,
  handler,
};
