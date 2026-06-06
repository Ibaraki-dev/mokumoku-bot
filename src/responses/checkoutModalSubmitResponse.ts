import {
  type APIActionRowComponent,
  type APIButtonComponent,
  type APIInteractionGuildMember,
  type APIInteractionResponseChannelMessageWithSource,
  type APIInteractionResponseUpdateMessage,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from "discord-api-types/v10";
import { EDIT_CHECKOUT_CUSTOM_ID } from "../constants";
import { buildCustomId } from "../interactions/parseCustomId";
import { getColorFromUsername } from "../utils/getColorFromUsername";

// todo: 共通化
const buildMemberProfileImageURL = (member: APIInteractionGuildMember) => {
  return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`;
};

export const buildCheckoutModalSubmitResponse = ({
  member,
  content,
  checkoutId,
  responseType = InteractionResponseType.ChannelMessageWithSource,
}: {
  member: APIInteractionGuildMember;
  content: string;
  checkoutId: number;
  responseType?:
    | InteractionResponseType.ChannelMessageWithSource
    | InteractionResponseType.UpdateMessage;
}):
  | APIInteractionResponseChannelMessageWithSource
  | APIInteractionResponseUpdateMessage => {
  const thumbnailURL = buildMemberProfileImageURL(member);
  return {
    type: responseType,
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
      components: [buildEditButtonActionRow(checkoutId)],
    },
  };
};

const buildEditButtonActionRow = (
  checkoutId: number,
): APIActionRowComponent<APIButtonComponent> => ({
  type: ComponentType.ActionRow,
  components: [
    {
      type: ComponentType.Button,
      style: ButtonStyle.Secondary,
      label: "編集",
      custom_id: buildCustomId(EDIT_CHECKOUT_CUSTOM_ID, checkoutId),
    },
  ],
});
