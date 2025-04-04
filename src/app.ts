import { InteractionType } from "discord-interactions";
import { Hono } from "hono";
import { ConnpassClient } from "./clients/connpass";
import { DiscordClient } from "./clients/discord";
import checkinCommand from "./interactions/applicationCommands/checkin";
import checkoutCommand from "./interactions/applicationCommands/checkout";
import generateEventDescription from "./interactions/applicationCommands/generateEventDescription";
import mokumokuStartCommand from "./interactions/applicationCommands/mokumokuStart";
import { handleApplicationCommands } from "./interactions/handleApplicationCommands";
import { handleModalSubmits } from "./interactions/handleModalSubmit";
import checkinModal from "./interactions/modalSubmits/checkinModal";
import checkoutModal from "./interactions/modalSubmits/checkoutModal";
import { verifyDiscordInteraction } from "./middleware/verifyDiscordInteraction";
import { CheckinsRepository } from "./repositories/checkinsRepository";
import { CheckoutsRepository } from "./repositories/checkout";
import { EventsRepository } from "./repositories/eventsRepository";
import { EventsToCheckinsRepository } from "./repositories/eventsToCheckinsRepository";
import { UsersRepository } from "./repositories/usersRepository";
import { errorResponse } from "./responses/errorResponse";
import { Bindings, Clients, Repositories } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

export const interactionRoot = app.post(
  "/interaction",
  verifyDiscordInteraction,
  async (c) => {
    const body = await c.req.json();

    const repositories: Repositories = {
      usersRepository: new UsersRepository(c.env.DB),
      checkinsRepository: new CheckinsRepository(c.env.DB),
      eventsRepository: new EventsRepository(c.env.DB),
      eventsToCheckinsRepository: new EventsToCheckinsRepository(c.env.DB),
      checkoutsRepository: new CheckoutsRepository(c.env.DB),
    };

    const clients: Clients = {
      discordClient: new DiscordClient(c.env.DISCORD_TOKEN),
      connpassClient: new ConnpassClient(),
    };

    try {
      switch (body.type) {
        case InteractionType.APPLICATION_COMMAND:
          return c.json(
            await handleApplicationCommands({
              repositories,
              clients,
              intentObj: body,
              commands: [
                checkinCommand,
                mokumokuStartCommand,
                generateEventDescription,
                checkoutCommand,
              ],
            }),
          );
        case InteractionType.MODAL_SUBMIT:
          return c.json(
            await handleModalSubmits({
              repositories,
              clients,
              modalSubmitObj: body,
              modals: [checkinModal, checkoutModal],
            }),
          );
        default:
          throw new Error("Invalid interaction");
      }
    } catch (e) {
      return c.json(
        errorResponse(e instanceof Error ? e.message : "Unknown error"),
      );
    }
  },
);

export default app;
