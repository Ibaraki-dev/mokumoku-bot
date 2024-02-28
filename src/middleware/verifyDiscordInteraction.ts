import { InteractionResponseType, verifyKey } from "discord-interactions";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";

export const verifyDiscordInteraction = createMiddleware(async (c, next) => {
  const { DISCORD_PUBLIC_KEY } = env<{ DISCORD_PUBLIC_KEY: string }>(c);
  const signature = c.req.header("X-Signature-Ed25519");
  const timestamp = c.req.header("X-Signature-Timestamp");
  if (!signature || !timestamp) {
    return c.json({ message: "invalid request signature" }, 401);
  }

  const rawBody = await c.req.raw.clone().text();
  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    DISCORD_PUBLIC_KEY,
  );

  if (!isValidRequest) {
    return c.json({ message: "invalid request signature" }, 401);
  }

  const body = JSON.parse(rawBody);
  if (body.type === InteractionResponseType.PONG) {
    return c.json({ type: InteractionResponseType.PONG });
  }
  await next();
});
