import { InteractionResponseType } from "discord-api-types/v10";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Repositories } from "../../types";
import mokumokuStat from "./mokumokuStart";

vi.mock("dayjs", () => ({
  default: () => ({
    tz: () => ({
      format: () => "2021年01月01日",
    }),
  }),
}));

describe("handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create new Event if today's event is not found", async () => {
    const repositories = {
      eventsRepository: {
        findTodayEvent: vi.fn().mockResolvedValue(undefined),
        create: vi.fn(),
      },
    };

    const response = await mokumokuStat.handler({
      repositories: repositories as unknown as Repositories,
    });

    expect(repositories.eventsRepository.create).toHaveBeenCalledWith({
      name: expect.any(String),
    });
    expect(response).toEqual({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: expect.stringContaining("2021年01月01日"),
        embeds: expect.any(Array),
      },
    });
  });

  it("should not create new Event if today's event is found", async () => {
    const repositories = {
      eventsRepository: {
        findTodayEvent: vi.fn().mockResolvedValue({}),
        create: vi.fn(),
      },
    };

    const response = await mokumokuStat.handler({
      repositories: repositories as unknown as Repositories,
    });

    expect(repositories.eventsRepository.create).not.toBeCalled();
    expect(response).toEqual({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: expect.stringContaining("2021年01月01日"),
        embeds: expect.any(Array),
      },
    });
  });
});
