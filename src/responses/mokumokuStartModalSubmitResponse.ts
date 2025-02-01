import {
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";

const contentText = (name: string) =>
  `
${name}を開始します！
準備ができたら \`/checkin\` コマンドで今日やることを投稿してください！
`.trim();

const checkinText = () =>
  `
メッセージ欄に\`/ chekcin\` と入力してEnterを押すと、モーダルが表示されます。そのモーダルに自己紹介と今日やることを入力して送信すると、チェックインが投稿されます。
`.trim();

export const buildMokumokuStartModalSubmitResponse = ({
  name,
  schedule,
}: {
  name: string;
  schedule: string;
}): APIInteractionResponseChannelMessageWithSource => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: contentText(name),
      embeds: [
        {
          thumbnail: {
            url: "https://avatars.githubusercontent.com/u/23022922?s=48&v=4",
          },
          fields: [
            {
              name: "🕗 スケジュール",
              value: schedule,
            },
            {
              name: "📝 checkinコマンド",
              value: checkinText(),
            },
          ],
        },
      ],
    },
  };
};
