import { InteractionType } from "discord-interactions";
import { Hono } from "hono";
import { handleApplicationComand as handleApplicationCommand } from "./interactions/applicationCommand";
import { handleModalSubmit } from "./interactions/modalSubmit";
import { verifyDiscordInteraction } from "./middleware/verifyDiscordInteraction";
import { CheckinsRepository } from "./repositories/checkinsRepository";
import { UsersRepository } from "./repositories/usersRepository";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/interaction", verifyDiscordInteraction, async (c) => {
  const body = await c.req.json();

  switch (body.type) {
    case InteractionType.APPLICATION_COMMAND:
      return c.json(
        await handleApplicationCommand({
          intentObj: body,
          userRepository: new UsersRepository(c.env.DB),
        }),
      );
    case InteractionType.MODAL_SUBMIT:
      return c.json(
        await handleModalSubmit({
          intentObj: body,
          userRepository: new UsersRepository(c.env.DB),
          checkinsRepository: new CheckinsRepository(c.env.DB),
        }),
      );
    default:
      throw new Error("Invalid interaction");
  }
});

export default app;
