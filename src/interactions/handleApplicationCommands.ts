import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { CheckinsRepository } from "../repositories/checkinsRepository";
import { UsersRepository } from "../repositories/usersRepository";
import { EventsRepository } from "./../repositories/eventsRepository";
import { events } from "./../schema";

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
  eventsRepository,
  commands,
}: {
  intentObj: ApplicationCommandObj;
  userRepository: UsersRepository;
  checkinsRepository: CheckinsRepository;
  eventsRepository: EventsRepository;
  commands: {
    commandName: string;
    handler: (args: {
      intentObj: ApplicationCommandObj;
      checkinsRepository: CheckinsRepository;
      userRepository: UsersRepository;
      eventsRepository: EventsRepository;
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
        eventsRepository,
        checkinsRepository,
      });
    }
  }

  throw new Error("Invalid interaction");
};
