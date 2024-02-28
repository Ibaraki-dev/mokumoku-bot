import { InteractionType } from "discord-interactions";
import { Hono } from "hono";
import checkinCommand from "./interactions/applicationCommands/checkin";
import generateEventDescription from "./interactions/applicationCommands/generateEventDescription";
import mokumokuStartCommand from "./interactions/applicationCommands/mokumokuStart";
import { handleApplicationCommands } from "./interactions/handleApplicationCommands";
import { handleModalSubmits } from "./interactions/handleModalSubmit";
import checkinModal from "./interactions/modalSubmits/checkinModal";
import { verifyDiscordInteraction } from "./middleware/verifyDiscordInteraction";
import { CheckinsRepository } from "./repositories/checkinsRepository";
import { EventsRepository } from "./repositories/eventsRepository";
import { EventsToCheckinsRepository } from "./repositories/eventsToCheckinsRepository";
import { UsersRepository } from "./repositories/usersRepository";
import { errorResponse } from "./responses/errorResponse";
import { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.post("/interaction", verifyDiscordInteraction, async (c) => {
  const body = await c.req.json();

  const repositories = {
    usersRepository: new UsersRepository(c.env.DB),
    checkinsRepository: new CheckinsRepository(c.env.DB),
    eventsRepository: new EventsRepository(c.env.DB),
    eventsToCheckinsRepository: new EventsToCheckinsRepository(c.env.DB),
  };

  try {
    switch (body.type) {
      case InteractionType.APPLICATION_COMMAND:
        return c.json(
          await handleApplicationCommands({
            repositories,
            intentObj: body,
            env: c.env,
            commands: [
              checkinCommand,
              mokumokuStartCommand,
              generateEventDescription,
            ],
          }),
        );
      case InteractionType.MODAL_SUBMIT:
        return c.json(
          await handleModalSubmits({
            repositories,
            intentObj: body,
            modals: [checkinModal],
          }),
        );
      default:
        throw new Error("Invalid interaction");
    }
  } catch (e) {
    console.error(e);
    return c.json(
      errorResponse(
        e instanceof Error
          ? e.message
          : "Unknown error. 開発者に相談してください。",
      ),
    );
  }
});

export default app;
