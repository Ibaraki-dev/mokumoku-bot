import {
  APIInteractionGuildMember,
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";

const buildMemberProfileImageURL = (member: APIInteractionGuildMember) => {
  return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;
};

const getRandomColor = () => {
  return parseInt(
    Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0"),
    16,
  );
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
          color: getRandomColor(),
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
              value: `${profile} \n\n `,
            },
            {
              name: "📚 今日やること",
              value: todo,
            },
          ],
        },
      ],
    },
  };
};
