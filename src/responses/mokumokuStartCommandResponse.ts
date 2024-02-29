import {
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";

export const buildMokumokuCommandResponse = ({
  date,
}: {
  date: string;
}): APIInteractionResponseChannelMessageWithSource => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `${date}のIbaraki.devを開始します！\n準備ができたら \`/checkin\` コマンドで今日やることを投稿してください！\n\n`,
      embeds: [
        {
          thumbnail: {
            url: "https://avatars.githubusercontent.com/u/161560614?s=200&v=4",
          },
          fields: [
            {
              name: "🕗 スケジュール",
              value:
                "**`13:00〜13:15`** チェックイン（自己紹介・やること共有）\n**`13:15〜15:00`** もくもく作業\n**`15:00〜15:30`** LT or テックトーク\n**`15:30〜17:50`** もくもく作業\n**`17:50〜18:00`** やったこと共有 & 片付け\n**`18:00〜`**           懇親会（希望者のみ）\n",
            },
            {
              name: "📝 checkinコマンド",
              value:
                "メッセージ欄に`/chekcin` と入力してEnterを押すと、モーダルが表示されます。そのモーダルに自己紹介と今日やることを入力して送信すると、チェックインが投稿されます。",
            },
          ],
        },
      ],
    },
  };
};
