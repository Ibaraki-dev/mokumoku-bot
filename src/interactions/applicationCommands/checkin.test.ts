import { describe, expect, it, vi } from "vitest";
import { buildCheckinModalResponse } from "../../responses/checkinCommandResponse";
import { Repositories } from "../../types";
import { ApplicationCommandObj } from "../handleApplicationCommands";
import checkinCommand from "./checkin";

describe("handler function", () => {
  it("should throw an error when member is not present", async () => {
    const intentObj = {} as ApplicationCommandObj;
    const repositories = {
      usersRepository: {},
      eventsRepository: {},
    } as Repositories;
    await expect(
      checkinCommand.handler({ intentObj, repositories }),
    ).rejects.toThrow();
  });

  it("should throw an error when there is no event today", async () => {
    const intentObj = {
      member: { user: { id: "123" } },
    } as ApplicationCommandObj;
    const eventsRepository = {
      findTodayEvent: vi.fn().mockResolvedValue(null),
    };
    const usersRepository = { findLatestCheckinByDiscordUserId: vi.fn() };
    const repositories = {
      usersRepository,
      eventsRepository,
    } as unknown as Repositories;
    await expect(
      checkinCommand.handler({ intentObj, repositories }),
    ).rejects.toThrow();
  });

  it("should return a response when there is an event today and a previous checkin", async () => {
    const intentObj = {
      member: { user: { id: "123" } },
    } as ApplicationCommandObj;
    const eventsRepository = { findTodayEvent: vi.fn().mockResolvedValue({}) };
    const usersRepository = {
      findLatestCheckinByDiscordUserId: vi
        .fn()
        .mockResolvedValue({ profile: "prev profile" }),
    };
    const repositories = {
      usersRepository,
      eventsRepository,
    } as unknown as Repositories;
    const response = await checkinCommand.handler({ intentObj, repositories });
    expect(response).toEqual(buildCheckinModalResponse("prev profile"));
  });

  it("should return a response when there is an event today and no previous checkin", async () => {
    const intentObj = {
      member: { user: { id: "123" } },
    } as ApplicationCommandObj;
    const eventsRepository = { findTodayEvent: vi.fn().mockResolvedValue({}) };
    const usersRepository = {
      findLatestCheckinByDiscordUserId: vi.fn().mockResolvedValue(null),
    };
    const repositories = {
      usersRepository,
      eventsRepository,
    } as unknown as Repositories;
    const response = await checkinCommand.handler({ intentObj, repositories });
    expect(response).toEqual(buildCheckinModalResponse(undefined));
  });
});
