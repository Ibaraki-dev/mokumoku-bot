import type { APIMessageComponentInteraction } from "discord-api-types/v10";
import type { Clients, Repositories } from "../types";

export type MessageComponentObj = APIMessageComponentInteraction;

export const handleMessageComponents = async ({
  messageComponentObj,
  repositories,
  clients,
  components,
}: {
  messageComponentObj: MessageComponentObj;
  repositories: Repositories;
  clients: Clients;
  components: {
    customId: string;
    handler: (args: {
      messageComponentObj: MessageComponentObj;
      repositories: Repositories;
      clients: Clients;
    }) => Promise<{
      type: number;
      data?: unknown;
    }>;
  }[];
}) => {
  for (const component of components) {
    if (
      messageComponentObj.data.custom_id === component.customId ||
      messageComponentObj.data.custom_id.startsWith(`${component.customId}:`)
    ) {
      return component.handler({
        messageComponentObj,
        clients,
        repositories,
      });
    }
  }
  throw new Error("Invalid interaction");
};
