import type { APIModalSubmissionComponent } from "discord-api-types/v10";
import { ComponentType } from "discord-api-types/v10";

export const getModalTextInputValue = (
  component: APIModalSubmissionComponent,
) => {
  if (component.type !== ComponentType.ActionRow) {
    throw new Error("Expected modal action row component");
  }

  return component.components[0].value;
};
