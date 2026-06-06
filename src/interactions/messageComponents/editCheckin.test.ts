import type {
  APIInteractionResponseCallbackData,
  APIModalInteractionResponseCallbackData,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";
import { describe, expect, it, vi } from "vitest";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import editCheckin from "./editCheckin";

describe("editCheckin component handler", () => {
  it("opens an edit modal for the checkin owner", async () => {
    const repositories = {
      checkinsRepository: {
        findByIdWithUser: vi.fn().mockResolvedValue({
          id: 123,
          discordUserId: "user-1",
          profile: "profile",
          todo: "todo",
        }),
      },
    } as unknown as Repositories;
    const messageComponentObj = {
      member: { user: { id: "user-1" } },
      data: { custom_id: "edit-checkin:123" },
    } as MessageComponentObj;

    const response = await editCheckin.handler({
      messageComponentObj,
      repositories,
    });

    expect(
      repositories.checkinsRepository.findByIdWithUser,
    ).toHaveBeenCalledWith(123);
    expect(response.type).toBe(InteractionResponseType.Modal);
    expect(
      (response.data as APIModalInteractionResponseCallbackData).custom_id,
    ).toBe("edit-checkin:123");
  });

  it("returns an ephemeral error for another user's checkin", async () => {
    const repositories = {
      checkinsRepository: {
        findByIdWithUser: vi.fn().mockResolvedValue({
          id: 123,
          discordUserId: "user-2",
          profile: "profile",
          todo: "todo",
        }),
      },
    } as unknown as Repositories;
    const messageComponentObj = {
      member: { user: { id: "user-1" } },
      data: { custom_id: "edit-checkin:123" },
    } as MessageComponentObj;

    const response = await editCheckin.handler({
      messageComponentObj,
      repositories,
    });

    expect(response.type).toBe(
      InteractionResponseType.ChannelMessageWithSource,
    );
    expect((response.data as APIInteractionResponseCallbackData).flags).toBe(
      64,
    );
  });
});
