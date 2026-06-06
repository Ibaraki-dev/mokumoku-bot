import {
  type APIActionRowComponent,
  type APIButtonComponent,
  type APIInteractionResponseChannelMessageWithSource,
  type APIInteractionResponseUpdateMessage,
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
} from "discord-api-types/v10";
import { EDIT_MOKUMOKU_START_CUSTOM_ID } from "../constants";
import type { MokumokuStartFormat } from "../repositories/mokumokuStartFormatsRepository";

export const defaultMokumokuStartFormat = {
  contentTemplate: `
{date}のIbaraki.devを開始します！
準備ができたら \`/checkin\` コマンドで今日やることを投稿してください！
`.trim(),
  schedule: `
**\`13:00〜13: 15\`** チェックイン（自己紹介・やること共有）
**\`13: 15〜15:00\`** もくもく作業
**\`15:00〜15: 30\`** LT or テックトーク
**\`15: 30〜17: 50\`** もくもく作業
**\`17: 50〜18:00\`** やったこと共有 & 片付け
**\`18:00〜\`**           懇親会（希望者のみ）
`.trim(),
  checkinCommand: `
メッセージ欄に\`/ checkin\` と入力してEnterを押すと、モーダルが表示されます。そのモーダルに自己紹介と今日やることを入力して送信すると、チェックインが投稿されます。
`.trim(),
  checkoutCommand: `
メッセージ欄に\`/ checkout\` と入力してEnterを押すと、モーダルが表示されます。そのモーダルに今日やったことを入力して送信すると、チェックアウトが投稿されます。
`.trim(),
} satisfies MokumokuStartFormat;

export const renderMokumokuStartContent = ({
  contentTemplate,
  date,
}: {
  contentTemplate: string;
  date: string;
}) => contentTemplate.replaceAll("{date}", date);

export const buildMokumokuCommandResponse = ({
  date,
  format = defaultMokumokuStartFormat,
  responseType = InteractionResponseType.ChannelMessageWithSource,
}: {
  date: string;
  format?: MokumokuStartFormat;
  responseType?:
    | InteractionResponseType.ChannelMessageWithSource
    | InteractionResponseType.UpdateMessage;
}):
  | APIInteractionResponseChannelMessageWithSource
  | APIInteractionResponseUpdateMessage => {
  return {
    type: responseType,
    data: {
      content: renderMokumokuStartContent({
        contentTemplate: format.contentTemplate,
        date,
      }),
      embeds: [
        {
          thumbnail: {
            url: "https://avatars.githubusercontent.com/u/161560614?s=200&v=4",
          },
          fields: [
            {
              name: "🕗 スケジュール",
              value: format.schedule,
            },
            {
              name: "🏠 checkinコマンド",
              value: format.checkinCommand,
            },
            {
              name: "🚗 checkoutコマンド",
              value: format.checkoutCommand,
            },
          ],
        },
      ],
      components: [buildEditButtonActionRow()],
    },
  };
};

const buildEditButtonActionRow =
  (): APIActionRowComponent<APIButtonComponent> => ({
    type: ComponentType.ActionRow,
    components: [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Secondary,
        label: "編集",
        custom_id: EDIT_MOKUMOKU_START_CUSTOM_ID,
      },
    ],
  });
