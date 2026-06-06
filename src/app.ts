import { InteractionType } from "discord-interactions";
import { Hono } from "hono";
import { ConnpassClient } from "./clients/connpass";
import { DiscordClient } from "./clients/discord";
import checkinCommand from "./interactions/applicationCommands/checkin";
import checkoutCommand from "./interactions/applicationCommands/checkout";
import generateEventDescription from "./interactions/applicationCommands/generateEventDescription";
import mokumokuStartCommand from "./interactions/applicationCommands/mokumokuStart";
import { handleApplicationCommands } from "./interactions/handleApplicationCommands";
import { handleMessageComponents } from "./interactions/handleMessageComponents";
import { handleModalSubmits } from "./interactions/handleModalSubmit";
import editCheckinComponent from "./interactions/messageComponents/editCheckin";
import editCheckoutComponent from "./interactions/messageComponents/editCheckout";
import editMokumokuStartComponent from "./interactions/messageComponents/editMokumokuStart";
import joinTechTalkComponent from "./interactions/messageComponents/joinTechTalk";
import leaveTechTalkComponent from "./interactions/messageComponents/leaveTechTalk";
import checkinModal from "./interactions/modalSubmits/checkinModal";
import checkoutModal from "./interactions/modalSubmits/checkoutModal";
import editCheckinModal from "./interactions/modalSubmits/editCheckinModal";
import editCheckoutModal from "./interactions/modalSubmits/editCheckoutModal";
import editMokumokuStartModal from "./interactions/modalSubmits/editMokumokuStartModal";
import { verifyDiscordInteraction } from "./middleware/verifyDiscordInteraction";
import { CheckinsRepository } from "./repositories/checkinsRepository";
import { CheckoutsRepository } from "./repositories/checkout";
import { EventsRepository } from "./repositories/eventsRepository";
import { EventsToCheckinsRepository } from "./repositories/eventsToCheckinsRepository";
import { MokumokuStartFormatsRepository } from "./repositories/mokumokuStartFormatsRepository";
import { TechTalkSpeakersRepository } from "./repositories/techTalkSpeakersRepository";
import { UsersRepository } from "./repositories/usersRepository";
import { errorResponse } from "./responses/errorResponse";
import type { Bindings, Clients, Repositories } from "./types";

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
      mokumokuStartFormatsRepository: new MokumokuStartFormatsRepository(
        c.env.DB,
      ),
      techTalkSpeakersRepository: new TechTalkSpeakersRepository(c.env.DB),
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
              modals: [
                checkinModal,
                checkoutModal,
                editCheckinModal,
                editCheckoutModal,
                editMokumokuStartModal,
              ],
            }),
          );
        case InteractionType.MESSAGE_COMPONENT:
          return c.json(
            await handleMessageComponents({
              repositories,
              clients,
              messageComponentObj: body,
              components: [
                editCheckinComponent,
                editCheckoutComponent,
                editMokumokuStartComponent,
                joinTechTalkComponent,
                leaveTechTalkComponent,
              ],
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
