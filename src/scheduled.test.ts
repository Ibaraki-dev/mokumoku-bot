import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { DiscordClient } from "./clients/discord";
import { EventsRepository } from "./repositories/eventsRepository";
import scheduled from "./scheduled";

vi.mock("./repositories/eventsRepository");
vi.mock("./clients/discord");

const mockEnv = {
  DB: {},
  DISCORD_TOKEN: "test-token",
  MOKUMOKU_CHANNEL_ID: "test-channel-id",
};

describe("scheduled", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    {
      cron: "0 6 * * SAT,SUN",
      isEventDay: true,
      isSendMessageCalled: true,
    },
    {
      cron: "50 8 * * SAT,SUN",
      isEventDay: true,
      isSendMessageCalled: true,
    },
    {
      cron: "0 6 * * SAT,SUN",
      isEventDay: false,
      isSendMessageCalled: false,
    },
    {
      cron: "50 8 * * SAT,SUN",
      isEventDay: false,
      isSendMessageCalled: false,
    },
  ])(
    "should send message to mokumoku channel on event day. %o",
    async ({ cron, isEventDay, isSendMessageCalled }) => {
      const mockSendMessage = vi.fn();
      (EventsRepository as Mock).mockImplementation(() => ({
        findTodayEvent: vi.fn().mockResolvedValue(isEventDay),
      }));
      (DiscordClient as Mock).mockImplementation(() => ({
        sendMessage: mockSendMessage,
      }));

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      await scheduled!({ cron } as any, mockEnv as any, {} as any);

      if (isSendMessageCalled) {
        expect(mockSendMessage).toBeCalled();
        expect(mockSendMessage.mock.calls[0][0]).toEqual({
          channelId: mockEnv.MOKUMOKU_CHANNEL_ID,
          body: {
            content: expect.any(String),
          },
        });
      } else {
        expect(mockSendMessage).not.toBeCalled();
      }
    },
  );
});
