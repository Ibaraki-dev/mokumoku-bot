import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { CheckinsRepository } from "../repositories/checkinsRepository";
import { UsersRepository } from "../repositories/usersRepository";

export type ApplicationCommandObj = APIBaseInteraction<
  InteractionType.ApplicationCommand,
  {
    name: string;
  }
>;

export const handleApplicationCommands = async ({
  intentObj,
  userRepository,
  checkinsRepository,
  commands,
}: {
  intentObj: ApplicationCommandObj;
  userRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
  commands: {
    commandName: string;
    handler: (args: {
      intentObj: ApplicationCommandObj;
      checkinsRepository: CheckinsRepository;
      userRepository: UsersRepository;
    }) => Promise<{
      type: number;
      data: unknown;
    }>;
  }[];
}) => {
  for (const command of commands) {
    if (command.commandName === intentObj.data?.name) {
      return command.handler({
        intentObj,
        userRepository,
        checkinsRepository,
      });
    }
  }

  throw new Error("Invalid interaction");
};
