import { InteractionResponseType, verifyKey } from "discord-interactions";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyDiscordInteraction } from "./verifyDiscordInteraction";

vi.mock("hono/adapter", () => ({
  env: () => ({ DISCORD_PUBLIC_KEY: "test-key" }),
}));
vi.mock("discord-interactions", async (importOriginal) => {
  const mod = await importOriginal<typeof import("discord-interactions")>();
  return {
    ...mod,
    verifyKey: vi.fn().mockReturnValue(true),
  };
});

describe("verifyDiscordInteraction", () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let ctx: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let next: any;

  beforeEach(() => {
    vi.clearAllMocks();
    ctx = {
      req: {
        header: vi.fn().mockReturnValue("ok"),
        raw: {
          clone: () => ({ text: () => JSON.stringify({ type: "no-pong" }) }),
        },
      },
      json: vi.fn(),
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } as any;
    next = vi.fn();
  });

  it("returns 401 if signature or timestamp is missing", async () => {
    ctx.req.header.mockReturnValueOnce(null);
    await verifyDiscordInteraction(ctx, next);
    expect(ctx.json).toHaveBeenCalledWith(
      { message: "invalid request signature" },
      401,
    );
  });

  it("returns 401 if request is not valid", async () => {
    (verifyKey as Mock).mockReturnValueOnce(false);
    await verifyDiscordInteraction(ctx, next);
    expect(ctx.json).toHaveBeenCalledWith(
      { message: "invalid request signature" },
      401,
    );
  });

  it("returns PONG if interaction type is PONG", async () => {
    ctx.req.raw.clone = () => ({
      text: () => JSON.stringify({ type: InteractionResponseType.PONG }),
    });
    await verifyDiscordInteraction(ctx, next);
    (verifyKey as Mock).mockReturnValueOnce(true);
    expect(ctx.json).toHaveBeenCalledWith({
      type: InteractionResponseType.PONG,
    });
  });

  it("calls next middleware if request is valid and interaction type is not PONG", async () => {
    ctx.req.raw.clone = () => ({
      text: () => JSON.stringify({ type: "no-pong" }),
    });
    await verifyDiscordInteraction(ctx, next);
    expect(next).toHaveBeenCalled();
  });
});
