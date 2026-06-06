import { ComponentType, InteractionResponseType } from "discord-api-types/v10";
import { describe, expect, it, vi } from "vitest";
import type { Repositories } from "../../types";
import type { ModalSubmitObj } from "../handleModalSubmit";
import editMokumokuStartModal from "./editMokumokuStartModal";

vi.mock("dayjs", () => ({
  default: () => ({
    tz: () => ({
      format: () => "2021年01月01日",
    }),
  }),
}));

describe("editMokumokuStartModal handler", () => {
  it("saves the format and updates the original message", async () => {
    const repositories = {
      mokumokuStartFormatsRepository: {
        upsert: vi.fn(),
      },
    } as unknown as Repositories;
    const modalSubmitObj = {
      member: {
        permissions: "8",
      },
      data: {
        custom_id: "edit-mokumoku-start",
        components: [
          buildInput("contentTemplate", "{date} start"),
          buildInput("schedule", "schedule"),
          buildInput("checkinCommand", "checkin help"),
          buildInput("checkoutCommand", "checkout help"),
        ],
      },
    } as ModalSubmitObj;

    const response = await editMokumokuStartModal.handler({
      modalSubmitObj,
      repositories,
    });

    expect(
      repositories.mokumokuStartFormatsRepository.upsert,
    ).toHaveBeenCalledWith({
      contentTemplate: "{date} start",
      schedule: "schedule",
      checkinCommand: "checkin help",
      checkoutCommand: "checkout help",
    });
    expect(response.type).toBe(InteractionResponseType.UpdateMessage);
    expect(response.data?.content).toBe("2021年01月01日 start");
  });

  it("does not save the format for non-admin users", async () => {
    const repositories = {
      mokumokuStartFormatsRepository: {
        upsert: vi.fn(),
      },
    } as unknown as Repositories;
    const modalSubmitObj = {
      member: {
        permissions: "0",
      },
      data: {
        custom_id: "edit-mokumoku-start",
        components: [
          buildInput("contentTemplate", "{date} start"),
          buildInput("schedule", "schedule"),
          buildInput("checkinCommand", "checkin help"),
          buildInput("checkoutCommand", "checkout help"),
        ],
      },
    } as ModalSubmitObj;

    const response = await editMokumokuStartModal.handler({
      modalSubmitObj,
      repositories,
    });

    expect(response.type).toBe(
      InteractionResponseType.ChannelMessageWithSource,
    );
    expect(
      repositories.mokumokuStartFormatsRepository.upsert,
    ).not.toHaveBeenCalled();
  });
});

const buildInput = (customId: string, value: string) => ({
  type: ComponentType.ActionRow,
  components: [
    {
      type: ComponentType.TextInput,
      custom_id: customId,
      value,
    },
  ],
});
