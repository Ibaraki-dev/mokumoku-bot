import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { Repositories } from "../types";

export type ApplicationCommandObj = APIBaseInteraction<
  InteractionType.ApplicationCommand,
  {
    name: string;
  }
>;

export const handleApplicationCommands = async ({
  intentObj,
  repositories,
  commands,
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
  commands: {
    commandName: string;
    handler: (args: {
      intentObj: ApplicationCommandObj;
      repositories: Repositories;
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
        repositories,
      });
    }
  }

  throw new Error("Invalid interaction");
};
