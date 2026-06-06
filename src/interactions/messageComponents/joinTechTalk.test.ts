import { InteractionResponseType } from "discord-api-types/v10";
import { describe, expect, it, vi } from "vitest";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import joinTechTalk from "./joinTechTalk";

describe("joinTechTalk component handler", () => {
  it("registers the user as a speaker and updates the message", async () => {
    const repositories = {
      techTalkSpeakersRepository: {
        join: vi.fn(),
        listByMessageId: vi.fn().mockResolvedValue([
          {
            discordUserId: "user-1",
          },
        ]),
      },
    } as unknown as Repositories;
    const messageComponentObj = {
      message: { id: "message-1" },
      member: {
        nick: "nickname",
        user: {
          id: "user-1",
          username: "username",
        },
      },
    } as MessageComponentObj;

    const response = await joinTechTalk.handler({
      messageComponentObj,
      repositories,
    });

    expect(repositories.techTalkSpeakersRepository.join).toHaveBeenCalledWith({
      messageId: "message-1",
      discordUserId: "user-1",
      displayName: "nickname",
    });
    expect(response.type).toBe(InteractionResponseType.UpdateMessage);
    expect(response.data.embeds?.[0].fields?.[0].value).toContain("<@user-1>");
  });
});
