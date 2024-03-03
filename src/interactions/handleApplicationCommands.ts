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
  env,
  commands,
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
  clients: Clients;
  env: Bindings;
  commands: {
    commandName: string;
    handler: (args: {
      intentObj: ApplicationCommandObj;
      repositories: Repositories;
      clients: Clients;
      env: Bindings;
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
