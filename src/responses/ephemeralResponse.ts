import {
  type APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10";

export const ephemeralResponse = (
  content: string,
): APIInteractionResponseChannelMessageWithSource => ({
  type: InteractionResponseType.ChannelMessageWithSource,
  data: {
    content,
    flags: MessageFlags.Ephemeral,
  },
});
