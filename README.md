# MokuMoku Bot

![Discord](https://img.shields.io/discord/1110091489469530132?style=flat-square&logo=discord&label=Discord) 

[LAPRASもくもく会](https://lapras.connpass.com/) で使うDiscord Botです。

- [Connpass](https://lapras.connpass.com/)
- [Discord](https://discord.gg/nEpKzXBkkC)

## 🚀 Features

### `/checkin` コマンド

`/checkin` で自己紹介と今日やることを入力するモーダルが表示されます。モーダルで入力した内容は、フォーマットされてチャンネルに投稿されます。

https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/b4dc1a42-5e12-4059-989b-2543d3ca31c3

### `/mokumoku-start` コマンド

`/mokumoku-start` でもくもく会のスケジュールと、`/checkin`コマンドの説明を投稿します。

<img src="https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/d709f532-af6d-4345-a875-ab02b4ba4324" width="500">


## 🔧 Development

### デプロイ

mainブランチにマージされたら、GitHub Actionsでデプロイされます。

### テーブルの変更

`src/schema.ts` を変更後、マイグレーションファイルを作成します。

```
pnpm run generate
```

マイグレーションファイルを適用します。

```
# ローカル
pnpm run migrate:local

# 本番
# 適応にはwranglerでのログインが必要です
pnpm run migrate:prod
```

## 💖 Thanks

- [Hono](https://hono.dev/)
- [Cloudflare](https://www.cloudflare.com/)
- [bun](https://bun.sh/)
