# MokuMoku Bot

![Discord](https://img.shields.io/discord/1110091489469530132?style=flat-square&logo=discord&label=Discord) 

[LAPRASもくもく会](https://lapras.connpass.com/) で使うDiscord Botです。

- [Connpass](https://lapras.connpass.com/)
- [Discord](https://discord.gg/nEpKzXBkkC)

## 🚀 Features

### `/checkin` コマンド

`/checkin` で自己紹介と今日やることを入力するモーダルが表示される。モーダルで入力した内容は、フォーマットされてチャンネルに投稿される。

https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/b4dc1a42-5e12-4059-989b-2543d3ca31c3

### `/mokumoku-start` コマンド

`/mokumoku-start` でもくもく会のスケジュールと、`/checkin`コマンドの説明を投稿する。

<img src="https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/d709f532-af6d-4345-a875-ab02b4ba4324" width="500">

さらに、15:00とTech Talkの開始、17:50にもくもく会終了の通知を行う。

<img src="https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/3ab98749-5bbb-40f5-a81b-6900e0f12c3a" width="450">
<img src="https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/3f11d35d-5eb0-4fb7-9046-e2ab43d01282" width="450">

## 🔧 Development


### テーブルの変更

`src/schema.ts` を変更後、マイグレーションファイルを作成

```
pnpm run generate
```

マイグレーションファイルを適用

```
# ローカル
pnpm run migrate:local

# 本番
pnpm run migrate:prod
```

## 💖 Thanks

- [Hono](https://hono.dev/)
- [Cloudflare](https://www.cloudflare.com/)
- [bun](https://bun.sh/)
