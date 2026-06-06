import { describe, expect, it } from "vitest";
import { buildCustomId, parseCustomId } from "./parseCustomId";

describe("custom id helpers", () => {
  it("builds and parses an id with a prefix", () => {
    const customId = buildCustomId("edit-checkin", 123);

    expect(customId).toBe("edit-checkin:123");
    expect(parseCustomId(customId, "edit-checkin")).toBe(123);
  });

  it("throws if the prefix does not match", () => {
    expect(() => parseCustomId("edit-checkout:123", "edit-checkin")).toThrow(
      "Invalid interaction",
    );
  });
});
