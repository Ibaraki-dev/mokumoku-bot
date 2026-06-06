import { InteractionResponseType } from "discord-api-types/v10";
import { describe, expect, it, vi } from "vitest";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";
import leaveTechTalk from "./leaveTechTalk";

describe("leaveTechTalk component handler", () => {
  it("removes the user from speakers and updates the message", async () => {
    const repositories = {
      techTalkSpeakersRepository: {
        leave: vi.fn(),
        listByMessageId: vi.fn().mockResolvedValue([]),
      },
    } as unknown as Repositories;
    const messageComponentObj = {
      message: { id: "message-1" },
      member: {
        user: {
          id: "user-1",
          username: "username",
        },
      },
    } as MessageComponentObj;

    const response = await leaveTechTalk.handler({
      messageComponentObj,
      repositories,
    });

    expect(repositories.techTalkSpeakersRepository.leave).toHaveBeenCalledWith({
      messageId: "message-1",
      discordUserId: "user-1",
    });
    expect(response.type).toBe(InteractionResponseType.UpdateMessage);
    expect(response.data.embeds?.[0].fields?.[0].value).toBe("まだいません");
  });
});
