import {
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";
import { testClient } from "hono/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import app, { interactionRoot } from "./app";
import { handleApplicationCommands } from "./interactions/handleApplicationCommands";
import { handleModalSubmits } from "./interactions/handleModalSubmit";
import { verifyDiscordInteraction } from "./middleware/verifyDiscordInteraction";

vi.mock("./middleware/verifyDiscordInteraction", () => {
  return {
    verifyDiscordInteraction: vi.fn(async (c, next) => await next()),
  };
});
vi.mock("./interactions/handleApplicationCommands", () => ({
  handleApplicationCommands: vi.fn(async () => ({ res: "ok" })),
}));
vi.mock("./interactions/handleModalSubmit", () => ({
  handleModalSubmits: vi.fn(async () => ({ res: "ok" })),
}));

const mockEnv = {
  DB: {},
  DISCORD_TOKEN: "test-token",
  MOKUMOKU_CHANNEL_ID: "test-channel-id",
};

describe("intensions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    {
      type: InteractionType.ApplicationCommand,
      handler: handleApplicationCommands,
    },
    {
      type: InteractionType.ModalSubmit,
      handler: handleModalSubmits,
    },
  ])(
    "should call correct handler based on interaction type",
    async ({ type, handler }) => {
      const res = await testClient<typeof interactionRoot>(
        app,
        mockEnv,
      ).interaction.$post({
        json: {
          type,
          data: {},
        },
      });

      expect(verifyDiscordInteraction).toHaveBeenCalled();
      expect(handler).toHaveBeenCalled();
      expect(await res.json()).toEqual({ res: "ok" });
    },
  );

  it("should return error response if un handle interaction type is received", async () => {
    const res = await testClient<typeof interactionRoot>(
      app,
      mockEnv,
    ).interaction.$post({
      json: {
        type: "UNHANDLED_TYPE",
        data: {},
      },
    });

    expect(await res.json()).toEqual({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "🚨 エラーが発生しました",
        embeds: expect.any(Array),
      },
    });
  });
});
