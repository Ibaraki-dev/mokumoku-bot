import { MOKUMOKU_START_MODAL_CUSTOM_ID } from "../../constants";
import { buildMokumokuStartModalSubmitResponse } from "../../responses/mokumokuStartModalSubmitResponse";
import { Repositories } from "../../types";
import { ModalSubmitObj } from "../handleModalSubmit";

const handler = async ({
  modalSubmitObj,
  repositories: { eventsRepository },
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
}) => {
  if (!(modalSubmitObj.member && modalSubmitObj.data)) {
    throw new Error("Invalid interaction");
  }
  const todayEvent = await eventsRepository.findTodayEvent();
  if (todayEvent) {
    throw new Error("今日のイベントはすでに作成されています。");
  }

  const name = modalSubmitObj.data.components[0].components[0].value;
  const schedule = modalSubmitObj.data.components[1].components[0].value;

  await eventsRepository.create({
    name,
    schedule,
  });

  return buildMokumokuStartModalSubmitResponse({
    name,
    schedule,
  });
};

export default {
  customId: MOKUMOKU_START_MODAL_CUSTOM_ID,
  handler,
};
