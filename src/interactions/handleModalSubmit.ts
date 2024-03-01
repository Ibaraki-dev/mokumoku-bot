import {
  APIBaseInteraction,
  APIModalSubmission,
  InteractionType,
} from "discord-api-types/v10";
import { CheckinsRepository } from "../repositories/checkinsRepository";
import { UsersRepository } from "../repositories/usersRepository";

export type ModalSubmitObj = APIBaseInteraction<
  InteractionType.ModalSubmit,
  APIModalSubmission
>;

export const handleModalSubmits = async ({
  intentObj,
  usersRepository,
  checkinsRepository,
  modals,
}: {
  intentObj: ModalSubmitObj;
  usersRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
  modals: {
    customId: string;
    handler: (args: {
      intentObj: ModalSubmitObj;
      usersRepository: UsersRepository;
      checkinsRepository: CheckinsRepository;
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
        usersRepository,
        checkinsRepository,
      });
    }
  }
  throw new Error("Invalid interaction");
};
