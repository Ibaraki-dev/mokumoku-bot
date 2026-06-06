import {
  type APIActionRowComponent,
  type APIButtonComponent,
  type APIEmbed,
  ButtonStyle,
  ComponentType,
  type RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";
import {
  JOIN_TECH_TALK_CUSTOM_ID,
  LEAVE_TECH_TALK_CUSTOM_ID,
} from "../constants";

type Speaker = {
  discordUserId: string;
};

export const buildTechTalkAnnouncementMessage = ({
  speakers = [],
}: {
  speakers?: Speaker[];
} = {}): RESTPostAPIChannelMessageJSONBody => ({
  content:
    "@here \nテックトークの時間です！発表したい人は「発表する」ボタンを押してください",
  embeds: [buildSpeakersEmbed(speakers)],
  components: [buildTechTalkButtonActionRow()],
});

const buildSpeakersEmbed = (speakers: Speaker[]): APIEmbed => ({
  fields: [
    {
      name: "🙋 発表予定",
      value:
        speakers.length > 0
          ? speakers
              .map(
                (speaker, index) => `${index + 1}. <@${speaker.discordUserId}>`,
              )
              .join("\n")
          : "まだいません",
    },
  ],
});

const buildTechTalkButtonActionRow =
  (): APIActionRowComponent<APIButtonComponent> => ({
    type: ComponentType.ActionRow,
    components: [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: "発表する",
        custom_id: JOIN_TECH_TALK_CUSTOM_ID,
      },
      {
        type: ComponentType.Button,
        style: ButtonStyle.Secondary,
        label: "辞退する",
        custom_id: LEAVE_TECH_TALK_CUSTOM_ID,
      },
    ],
  });
