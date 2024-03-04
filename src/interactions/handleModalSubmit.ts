import {
  APIBaseInteraction,
  APIModalSubmission,
  InteractionType,
} from "discord-api-types/v10";
import { Clients, Repositories } from "../types";

export type ModalSubmitObj = APIBaseInteraction<
  InteractionType.ModalSubmit,
  APIModalSubmission
>;

export const handleModalSubmits = async ({
  modalSubmitObj,
  repositories,
  clients,
  modals,
}: {
  modalSubmitObj: ModalSubmitObj;
  repositories: Repositories;
  clients: Clients;
  modals: {
    customId: string;
    handler: (args: {
      modalSubmitObj: ModalSubmitObj;
      repositories: Repositories;
      clients: Clients;
    }) => Promise<{
      type: number;
      data: unknown;
    }>;
  }[];
}) => {
  for (const modal of modals) {
    if (modal.customId === modalSubmitObj.data?.custom_id) {
      return modal.handler({
        modalSubmitObj,
        clients,
        repositories,
      });
    }
  }
  throw new Error("Invalid interaction");
};
