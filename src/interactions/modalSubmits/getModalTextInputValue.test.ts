import { ComponentType } from "discord-api-types/v10";
import { describe, expect, it } from "vitest";
import { getModalTextInputValue } from "./getModalTextInputValue";

describe("getModalTextInputValue", () => {
  it("returns the first text input value from an action row", () => {
    expect(
      getModalTextInputValue({
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.TextInput,
            custom_id: "profile",
            value: "hello",
          },
        ],
      }),
    ).toBe("hello");
  });

  it("throws when the component is not an action row", () => {
    expect(() =>
      getModalTextInputValue({
        type: ComponentType.TextDisplay,
      }),
    ).toThrow("Expected modal action row component");
  });
});
