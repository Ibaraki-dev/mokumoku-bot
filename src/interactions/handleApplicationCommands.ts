import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { Bindings, Repositories } from "../types";

export type ApplicationCommandObj = APIBaseInteraction<
  InteractionType.ApplicationCommand,
  {
    name: string;
  }
>;

export const handleApplicationCommands = async ({
  intentObj,
  repositories,
  env,
  commands,
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
  env: Bindings;
  commands: {
    commandName: string;
    handler: (args: {
      intentObj: ApplicationCommandObj;
      repositories: Repositories;
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
        env,
      });
    }
  }

  throw new Error("Invalid interaction");
};
