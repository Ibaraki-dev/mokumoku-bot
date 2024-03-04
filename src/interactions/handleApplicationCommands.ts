import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { Bindings, Clients, Repositories } from "../types";

export type ApplicationCommandObj = APIBaseInteraction<
  InteractionType.ApplicationCommand,
  {
    name: string;
  }
>;

export const handleApplicationCommands = async ({
  intentObj,
  repositories,
  clients,
  commands,
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
  clients: Clients;
  commands: {
    commandName: string;
    handler: (args: {
      intentObj: ApplicationCommandObj;
      repositories: Repositories;
      clients: Clients;
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
        clients,
        env,
      });
    }
  }

  throw new Error("Invalid interaction");
};
