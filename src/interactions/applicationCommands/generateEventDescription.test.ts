import { InteractionResponseType } from "discord-api-types/v9";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Clients, Repositories } from "../../types";
import { ApplicationCommandObj } from "../handleApplicationCommands";
import generateEventDescriptionCommand from "./generateEventDescription";

describe("handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if no previous event is found", async () => {
    const connpassClient = { getLatestEventUrlFromGroupPage: vi.fn() };
    const eventsRepository = {
      findLatestEventWithCheckins: vi.fn().mockResolvedValue(undefined),
    };
    const discordClient = { sendTextFile: vi.fn() };

    await expect(
      generateEventDescriptionCommand.handler({
        intentObj: {} as ApplicationCommandObj,
        clients: { discordClient, connpassClient } as unknown as Clients,
        repositories: { eventsRepository } as unknown as Repositories,
      }),
    ).rejects.toThrow();
  });

  it("should throw an error if channel id is not present", async () => {
    const connpassClient = { getLatestEventUrlFromGroupPage: vi.fn() };
    const eventsRepository = {
      findLatestEventWithCheckins: vi.fn().mockResolvedValue({}),
    };
    const discordClient = { sendTextFile: vi.fn() };

    await expect(
      generateEventDescriptionCommand.handler({
        intentObj: {} as ApplicationCommandObj,
        clients: { discordClient, connpassClient } as unknown as Clients,
        repositories: { eventsRepository } as unknown as Repositories,
      }),
    ).rejects.toThrow();
  });

  it("should send a text file and return a response if a previous event is found and channel id is present", async () => {
    const connpassClient = {
      getLatestEventUrlFromGroupPage: vi
        .fn()
        .mockResolvedValue("https://example.com"),
    };
    const eventsRepository = {
      findLatestEventWithCheckins: vi.fn().mockResolvedValue({
        eventsToCheckins: [{ checkin: { todo: "todo1" } }],
      }),
    };
    const discordClient = { sendTextFile: vi.fn() };

    const response = await generateEventDescriptionCommand.handler({
      intentObj: { channel: { id: "123" } } as ApplicationCommandObj,
      clients: { discordClient, connpassClient } as unknown as Clients,
      repositories: { eventsRepository } as unknown as Repositories,
    });

    expect(discordClient.sendTextFile).toHaveBeenCalledWith({
      channelId: "123",
      file: {
        name: expect.any(String),
        content: expect.stringContaining("https://example.com"),
      },
    });
    expect(response).toEqual({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: expect.any(String),
      },
    });
  });
});
