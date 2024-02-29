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
  userRepository,
  checkinsRepository,
  modals,
}: {
  intentObj: ModalSubmitObj;
  userRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
  modals: {
    customId: string;
    handler: (args: {
      intentObj: ModalSubmitObj;
      userRepository: UsersRepository;
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
        userRepository,
        checkinsRepository,
      });
    }
  }
  throw new Error("Invalid interaction");
};
