import {
  APIInteractionGuildMember,
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";
import { getColorFromUsername } from "../utils/getColorFromUsername";

const buildMemberProfileImageURL = (member: APIInteractionGuildMember) => {
  return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;
};

export const buildCheckinModalSubmitResponse = ({
  member,
  profile,
  todo,
}: {
  member: APIInteractionGuildMember;
  profile: string;
  todo: string;
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
              name: "👤 自己紹介",
              value: profile,
            },
            {
              name: "",
              value: "",
            },
            {
              name: "📚 今日やること",
              value: todo,
            },
            {
              name: "",
              value: "",
            },
          ],
        },
      ],
    },
  };
};
