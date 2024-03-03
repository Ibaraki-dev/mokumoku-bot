import {
  APIInteractionResponseChannelMessageWithSource,
  InteractionResponseType,
} from "discord-api-types/v10";
import {
  CONNPASS_EVENT_PAGE_URL,
  GENERATE_EVENT_DESCRIPTION_COMMAND_NAME,
} from "../../constants";
import { Bindings, Clients, Repositories } from "../../types";
import { ApplicationCommandObj } from "../handleApplicationCommands";

const buildDescription = (eventUrl: string, todos: string[]) => {
  return `
# :memo: 概要

茨城のエンジニアが集まりもくもくする会です。初参加も大歓迎です！

* 茨城で数少ないエンジニア仲間を作りたい
* 集中してコードを書きたい
* 本を読みたい
* 異業種からエンジニア転職考えて勉強中
* 学生だけど、働くエンジニアにあってみたい
* リモートワーカーに話を聞いてみたい
*  LTの練習がしたい

などなど、お気軽にご参加ください！

# :alarm_clock: 当日のタイムテーブル

| 時間 |	内容 |
|:---|:---|
|12:50 - 13:00|受付|
|13:00 - 13:15|Discordにやること & 自己紹介投稿|
|13:15 - 15:00|もくもくタイム|
|15:00 - 15:40|LT or テックトーク |
|15:40 - 17:50|もくもくタイム|
|17:50 - 18:00|やったこと共有 & 片付け |
|18:00 - |懇親会（希望者いれば）|

**LT・テックトーク**
もくもく会の中休みとして、LT希望者がいる場合はLTを開催します。もし、LT希望者がいない場合は、最近の気になったテック系ニュースや、お気に入りのツールを紹介するテックトークを開催します（[開催イメージ](https://www.youtube.com/playlist?list=PLKbaztxP2P4jpdF0P5YbJNJwFabB-pksK)）。テックトークで資料等を準備する必要はありません。気軽にご参加ください。

**懇親会**
希望者がいれば、もくもく会終了後に近くの居酒屋で懇親会を実施します。


# :hammer_and_wrench: 事前準備

当日の連絡はIbaraki.devのDiscordで行います。以下からご参加ください

https://discord.gg/4XA8EhEseZ


# :man_raising_hand: 主催者紹介

### かわまた ([@KawamataRyo](https://twitter.com/KawamataRyo)）
<img src="https://media.connpass.com/thumbs/6f/c0/6fc09eebebc8d00ca556bb2cc5c8c6e0.png" width="80">

元消防士のソフトウェアエンジニア。2児の父。趣味は個人開発と筋トレ。  \n TypeScript, Vue.js, React, Firebase, Cloudflareが好き。  \n[GitHub](https://github.com/kawamataryo), [X(Twitter)](https://twitter.com/KawamataRyo), [Zenn](https://zenn.dev/ryo_kawamata)

### なっぱ ([@b7472](http://twitter.com/b7472))
<img src="https://media.connpass.com/thumbs/1d/55/1d55250514576ac77dd1c3b8bc68ae8f.png" width="80">

EC特化でエンジニアを続けてきた32歳。茨城県水戸市でフルリモートのSREをやっている。  \n最近のブームはRust, Golang, TypeScriptあたり。趣味は料理。  \n茨城のエンジニア界隈を盛り上げていきましょう！！

# :eyes: Q & A

#### Q. 常連が多そうで不安です・・
A. 地域柄エンジニアの絶対数が少なく固定メンバーが多いですが、初参加はいつでも大歓迎です！ぜひぜひお気軽に

#### Q. Web系ではなくハードウェア系なんですが参加できますか？
A. Web系に限らずどのような分野でも大丈夫です！ハードウェア系の方も過去に多数参加いただいてます

#### Q. エンジニアじゃないんですが参加できますか？
A. エンジニアじゃなくても大丈夫です！プログラミングやエンジニアリングに興味があればOKです

#### Q. 懇親会は参加しなくてはならないのですか？
A. 懇親会は自由参加です！懇親会に参加せず帰る方もいます。希望者がいれば、近くの居酒屋で2時間ほどご飯を食べたりお酒を飲んだりする感じです

#### Q. Discordでの通話やテキストによる交流が強制されることはありますか？
A. 全くありません。何も気にせず気軽に参加してください

#### Q. 会場に駐車場はありますか？
A.  会場に駐車場がありません。お車でご来場の方は近くの有料駐車場に駐車してください

* パラカ水戸南町第2 終日最大500円
* パラカ水戸南町第2 終日最大600円
* リパーク水戸南町3丁目第2 終日最大600円
* タイムズ水戸泉町 終日最大600円

#### Q. 過去参加者はどんなことをもくもくしていましたか？
A. 前回のイベントの参加者は以下のようなことをしていました

${eventUrl}

\`\`\`
${todos.join("\n-----------\n")}
\`\`\`

# :police_car_light: その他・注意

### アンチハラスメントポリシー
Ibaraki.dev では、アンチハラスメントポリシーを定めています。 なるべく多くの人が楽しめる場を作るために、イベント参加者全員が以下のポリシーに同意していただく必要があります。 もちろん、イベント運営メンバーは、ポリシーに則った態度や言動を徹底します。\n

ハラスメントには以下のようなものを含みます。また、これらに限りません。\n

* ジェンダー、性自認やジェンダー表現、性的指向、障碍、容貌、体型、人種、民族、年齢、宗教あるいは無宗教についての攻撃的なコメントをすること
* 公共のスペースで性的な画像を掲示すること
* 不快な性的アトラクション
* 不適切な身体的接触
* 脅迫、ストーキング、付きまとい。または、それらを計画すること
* いやがらせ目的の撮影や録音
* 発表や他のイベントを継続的に妨害すること

イベント会場内だけではなく、SNSやブログなどを通じた交流や発信についても、ハラスメント行為がないようにご留意ください。 ハラスメント行為を見聞きした方は、お手数ですがイベント運営メンバーの誰かにTwitter DMなどでご連絡ください。 ご協力よろしくお願いします。
`.trim();
};

const handler = async ({
  intentObj,
  clients: { discordClient, connpassClient },
  repositories: { eventsRepository },
  env,
}: {
  intentObj: ApplicationCommandObj;
  repositories: Repositories;
  clients: Clients;
  env: Bindings;
}): Promise<APIInteractionResponseChannelMessageWithSource> => {
  const latestEventUrl = await connpassClient.getLatestEventUrlFromGroupPage(
    CONNPASS_EVENT_PAGE_URL,
  );
  const eventWithCheckins =
    await eventsRepository.findLatestEventWithCheckins();
  if (!eventWithCheckins) {
    throw new Error("前回のイベントが見つかりませんでした。");
  }
  if (!intentObj.channel?.id) {
    throw new Error("Invalid interaction");
  }

  await discordClient.sendTextFile({
    channelId: intentObj.channel.id,
    file: {
      name: "eventDescription.md",
      content: buildDescription(
        latestEventUrl,
        eventWithCheckins.eventsToCheckins.map((c) => c.checkin.todo),
      ),
    },
  });

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: "前回イベントの情報を元に次回イベントの概要を生成しました🛠️",
    },
  };
};

export default {
  commandName: GENERATE_EVENT_DESCRIPTION_COMMAND_NAME,
  handler,
};
