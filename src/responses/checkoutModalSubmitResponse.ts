import {
  APIInteractionGuildMember,
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";
import { getColorFromUsername } from "../utils/getColorFromUsername";

// todo: 共通化
const buildMemberProfileImageURL = (member: APIInteractionGuildMember) => {
  return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;
};

export const buildCheckoutModalSubmitResponse = ({
  member,
  content,
}: {
  member: APIInteractionGuildMember;
  content: string;
}): APIInteractionResponseChannelMessageWithSource => {
  const thumbnailURL = buildMemberProfileImageURL(member);
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [
        {
          url: "https://discordapp.com",
          color: getColorFromUsername(member.user.username),
          thumbnail: {
            url: thumbnailURL,
          },
          footer: {
            icon_url: thumbnailURL,
            text: `posted by ${member.user.username}`,
          },
          fields: [
            {
              name: "💪 今日やったこと",
              value: content,
            },
          ],
        },
      ],
    },
  };
};
