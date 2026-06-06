import { beforeEach, describe, expect, it, vi } from "vitest";
import { UsersRepository } from "./usersRepository";

const dayjsMock = vi.hoisted(() => {
  const format = vi.fn(() => "2026-06-06");
  const tz = vi.fn(() => ({ format }));
  const dayjs = vi.fn(() => ({ tz }));

  return { dayjs, format, tz };
});

vi.mock("dayjs", () => ({
  default: dayjsMock.dayjs,
}));

const buildRepository = (rows: unknown[]) => {
  const query = {
    from: vi.fn(),
    innerJoin: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn().mockResolvedValue(rows),
  };
  query.from.mockReturnValue(query);
  query.innerJoin.mockReturnValue(query);
  query.where.mockReturnValue(query);
  query.orderBy.mockReturnValue(query);

  const repository = Object.create(
    UsersRepository.prototype,
  ) as UsersRepository;
  (repository as unknown as { db: { select: ReturnType<typeof vi.fn> } }).db = {
    select: vi.fn(() => query),
  };

  return { repository, query };
};

describe("UsersRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findLatestCheckinByDiscordUserId", () => {
    it("returns the latest checkin without filtering by today's date", async () => {
      const latestCheckin = {
        id: 1,
        userId: 2,
        todo: "todo",
        profile: "latest profile",
        date: "2026-05-30",
      };
      const { repository, query } = buildRepository([latestCheckin]);

      await expect(
        repository.findLatestCheckinByDiscordUserId("discord-user-id"),
      ).resolves.toEqual(latestCheckin);

      expect(query.innerJoin).toHaveBeenCalled();
      expect(query.orderBy).toHaveBeenCalled();
      expect(dayjsMock.dayjs).not.toHaveBeenCalled();
    });
  });

  describe("findTodayCheckinByDiscordUserId", () => {
    it("filters by today's date in the configured timezone", async () => {
      const todayCheckin = {
        id: 1,
        userId: 2,
        todo: "today todo",
        profile: "profile",
        date: "2026-06-06",
      };
      const { repository } = buildRepository([todayCheckin]);

      await expect(
        repository.findTodayCheckinByDiscordUserId("discord-user-id"),
      ).resolves.toEqual(todayCheckin);

      expect(dayjsMock.dayjs).toHaveBeenCalled();
      expect(dayjsMock.tz).toHaveBeenCalled();
      expect(dayjsMock.format).toHaveBeenCalledWith("YYYY-MM-DD");
    });
  });
});
