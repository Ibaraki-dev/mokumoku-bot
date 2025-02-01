import {
  APIInteractionGuildMember,
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";

// todo: 共通化
const buildMemberProfileImageURL = (member: APIInteractionGuildMember) => {
  return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;
};

// todo: 共通化
const getColorFromUsername = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = (hash & 0x00ffffff).toString(16).toUpperCase();
  color = color.padStart(6, "0");

  // 明るさを調整するために、各色成分を少し明るくする
  const r = Math.min(255, parseInt(color.substring(0, 2), 16) + 50);
  const g = Math.min(255, parseInt(color.substring(2, 4), 16) + 50);
  const b = Math.min(255, parseInt(color.substring(4, 6), 16) + 50);

  return (r << 16) + (g << 8) + b;
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
