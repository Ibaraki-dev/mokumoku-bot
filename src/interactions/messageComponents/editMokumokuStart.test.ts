import type {
  APIActionRowComponent,
  APIModalInteractionResponseCallbackData,
  APITextInputComponent,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";
import { describe, expect, it, vi } from "vitest";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import editMokumokuStart from "./editMokumokuStart";

describe("editMokumokuStart component handler", () => {
  it("opens an edit modal with saved format", async () => {
    const repositories = {
      mokumokuStartFormatsRepository: {
        find: vi.fn().mockResolvedValue({
          contentTemplate: "{date} saved",
          schedule: "saved schedule",
          checkinCommand: "saved checkin",
          checkoutCommand: "saved checkout",
        }),
      },
    } as unknown as Repositories;

    const response = await editMokumokuStart.handler({
      messageComponentObj: {
        member: {
          permissions: "8",
        },
      } as MessageComponentObj,
      repositories,
    });

    expect(response.type).toBe(InteractionResponseType.Modal);
    const data = response.data as APIModalInteractionResponseCallbackData;
    expect(data.custom_id).toBe("edit-mokumoku-start");
    const firstRow = data
      .components[0] as APIActionRowComponent<APITextInputComponent>;
    expect(firstRow.components[0].value).toBe("{date} saved");
  });

  it("returns an ephemeral error for non-admin users", async () => {
    const repositories = {
      mokumokuStartFormatsRepository: {
        find: vi.fn(),
      },
    } as unknown as Repositories;

    const response = await editMokumokuStart.handler({
      messageComponentObj: {
        member: {
          permissions: "0",
        },
      } as MessageComponentObj,
      repositories,
    });

    expect(response.type).toBe(
      InteractionResponseType.ChannelMessageWithSource,
    );
    expect(
      repositories.mokumokuStartFormatsRepository.find,
    ).not.toHaveBeenCalled();
  });
});
