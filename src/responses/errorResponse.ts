import {
  type APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";

export const errorResponse = (
  errorMessage: string,
): APIInteractionResponseChannelMessageWithSource => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: "🚨 エラーが発生しました",
      embeds: [
        {
          color: 0xff0000,
          description: errorMessage,
        },
      ],
    },
  };
};
