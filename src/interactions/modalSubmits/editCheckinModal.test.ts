import { ComponentType, InteractionResponseType } from "discord-api-types/v10";
import { describe, expect, it, vi } from "vitest";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import editCheckinModal from "./editCheckinModal";

describe("editCheckinModal handler", () => {
  it("updates the checkin and returns an update message response", async () => {
    const repositories = {
      checkinsRepository: {
        findByIdWithUser: vi.fn().mockResolvedValue({
          id: 123,
          discordUserId: "user-1",
        }),
        update: vi.fn(),
      },
    } as unknown as Repositories;
    const modalSubmitObj = {
      member: {
        user: {
          id: "user-1",
          username: "test",
        },
      },
      data: {
        custom_id: "edit-checkin:123",
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.TextInput,
                custom_id: "profile",
                value: "updated profile",
              },
            ],
          },
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.TextInput,
                custom_id: "todo",
                value: "updated todo",
              },
            ],
          },
        ],
      },
    } as ModalSubmitObj;

    const response = await editCheckinModal.handler({
      modalSubmitObj,
      repositories,
    });

    expect(repositories.checkinsRepository.update).toHaveBeenCalledWith({
      id: 123,
      profile: "updated profile",
      todo: "updated todo",
    });
    expect(response.type).toBe(InteractionResponseType.UpdateMessage);
  });
});
