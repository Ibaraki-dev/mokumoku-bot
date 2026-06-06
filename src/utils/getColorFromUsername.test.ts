import { describe, expect, it } from "vitest";
import { getColorFromUsername } from "./getColorFromUsername";

describe("getColorFromUsername", () => {
  it("returns the same color for the same username", () => {
    expect(getColorFromUsername("kawamata")).toBe(
      getColorFromUsername("kawamata"),
    );
  });

  it("returns a valid RGB integer", () => {
    const color = getColorFromUsername("ibaraki-dev");

    expect(color).toBeGreaterThanOrEqual(0x000000);
    expect(color).toBeLessThanOrEqual(0xffffff);
  });
});
