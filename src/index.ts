import { InteractionType } from "discord-interactions";
import { Hono } from "hono";
import checkinCommand from "./interactions/applicationCommands/checkin";
import mokumokuStartCommand from "./interactions/applicationCommands/mokumokuStart";
import { handleApplicationCommands } from "./interactions/handleApplicationCommands";
import { handleModalSubmits } from "./interactions/handleModalSubmit";
import checkinModal from "./interactions/modalSubmits/checkinModal";
import { verifyDiscordInteraction } from "./middleware/verifyDiscordInteraction";
import { CheckinsRepository } from "./repositories/checkinsRepository";
import { UsersRepository } from "./repositories/usersRepository";
import { errorResponse } from "./responses/errorResponse";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/interaction", verifyDiscordInteraction, async (c) => {
  const body = await c.req.json();

  try {
    switch (body.type) {
      case InteractionType.APPLICATION_COMMAND:
        return c.json(
          await handleApplicationCommands({
            intentObj: body,
            userRepository: new UsersRepository(c.env.DB),
            checkinsRepository: new CheckinsRepository(c.env.DB),
            commands: [checkinCommand, mokumokuStartCommand],
          }),
        );
      case InteractionType.MODAL_SUBMIT:
        return c.json(
          await handleModalSubmits({
            intentObj: body,
            userRepository: new UsersRepository(c.env.DB),
            checkinsRepository: new CheckinsRepository(c.env.DB),
            modals: [checkinModal],
          }),
        );
      default:
        throw new Error("Invalid interaction");
    }
  } catch (e) {
    console.error(e);
    return c.json(
      errorResponse(e instanceof Error ? e.message : "Unknown error"),
    );
  }
});

export default app;
