import { beforeEach, describe, expect, it, vi } from "vitest";
import { Repositories } from "../../types";
import { ApplicationCommandObj } from "../handleApplicationCommands";
import { ModalSubmitObj } from "../handleModalSubmit";
import checkinModal from "./checkinModal";

describe("handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if modalSubmitObj.member or modalSubmitObj.data is not present", async () => {
    const repositories = {
      usersRepository: {},
      eventsRepository: {},
      checkinsRepository: {},
      eventsToCheckinsRepository: {},
    } as unknown as Repositories;

    await expect(
      checkinModal.handler({
        modalSubmitObj: {} as ModalSubmitObj,
        repositories,
      }),
    ).rejects.toThrow();
  });

  it("should throw an error if no event is happening today", async () => {
    const repositories = {
      usersRepository: {},
      eventsRepository: { findTodayEvent: vi.fn().mockResolvedValue(null) },
      checkinsRepository: {},
      eventsToCheckinsRepository: {},
    } as unknown as Repositories;
    const modalSubmitObj = { member: {}, data: {} } as ModalSubmitObj;

    await expect(
      checkinModal.handler({ modalSubmitObj, repositories }),
    ).rejects.toThrow();
  });

  it("should create a new user if the user does not exist", async () => {
    const repositories = {
      usersRepository: {
        findUserByDiscordUserId: vi.fn().mockResolvedValue(null),
        create: vi.fn(() => ({
          id: 1,
        })),
      },
      eventsRepository: {
        findTodayEvent: vi.fn().mockResolvedValue({ id: 2 }),
      },
      checkinsRepository: {
        create: vi.fn(() => ({
          id: 3,
        })),
      },
      eventsToCheckinsRepository: { create: vi.fn() },
    } as unknown as Repositories;
    const modalSubmitObj = {
      member: { user: { id: "1", username: "test" } },
      data: {
        components: [
          { components: [{ value: "profile" }] },
          { components: [{ value: "todo" }] },
        ],
      },
    } as ModalSubmitObj;

    await checkinModal.handler({ modalSubmitObj, repositories });

    expect(repositories.usersRepository.create).toHaveBeenCalledWith({
      name: "test",
      discordUserId: "1",
    });
    expect(repositories.checkinsRepository.create).toHaveBeenCalledWith({
      userId: 1,
      todo: "todo",
      profile: "profile",
    });
    expect(repositories.eventsToCheckinsRepository.create).toHaveBeenCalledWith(
      {
        eventId: 2,
        checkinId: 3,
      },
    );
  });

  it("should create a checkin and an eventToCheckin", async () => {
    const repositories = {
      usersRepository: {
        findUserByDiscordUserId: vi.fn().mockResolvedValue({ id: 1 }),
        create: vi.fn(),
      },
      eventsRepository: {
        findTodayEvent: vi.fn().mockResolvedValue({ id: 2 }),
      },
      checkinsRepository: { create: vi.fn().mockResolvedValue({ id: 3 }) },
      eventsToCheckinsRepository: { create: vi.fn() },
    } as unknown as Repositories;
    const modalSubmitObj = {
      member: { user: { id: "1", username: "test" } },
      data: {
        components: [
          { components: [{ value: "profile" }] },
          { components: [{ value: "todo" }] },
        ],
      },
    } as ModalSubmitObj;

    await checkinModal.handler({ modalSubmitObj, repositories });

    expect(repositories.usersRepository.create).not.toBeCalled();
    expect(repositories.checkinsRepository.create).toHaveBeenCalledWith({
      userId: 1,
      profile: "profile",
      todo: "todo",
    });
    expect(repositories.eventsToCheckinsRepository.create).toHaveBeenCalledWith(
      {
        eventId: 2,
        checkinId: 3,
      },
    );
  });
});
