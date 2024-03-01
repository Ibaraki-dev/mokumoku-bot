import {
  APIBaseInteraction,
  APIModalSubmission,
  InteractionType,
} from "discord-api-types/v10";
import { Repositories } from "../types";

export type ModalSubmitObj = APIBaseInteraction<
  InteractionType.ModalSubmit,
  APIModalSubmission
>;

export const handleModalSubmits = async ({
  intentObj,
  repositories,
  modals,
}: {
  intentObj: ModalSubmitObj;
  repositories: Repositories;
  modals: {
    customId: string;
    handler: (args: {
      intentObj: ModalSubmitObj;
      repositories: Repositories;
    }) => Promise<{
      type: number;
      data: unknown;
    }>;
  }[];
}) => {
  for (const modal of modals) {
    if (modal.customId === intentObj.data?.custom_id) {
      return modal.handler({
        intentObj,
        repositories,
      });
    }
  }
  throw new Error("Invalid interaction");
};
