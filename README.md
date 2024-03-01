# Mokumoku Bot

[Ibaraki.dev](https://discord.gg/4XA8EhEseZ) のもくもく会で使うDiscord Botです。


## 🚀 Features

### `/checkin`

`/checkin` で自己紹介と今日やることを入力するモーダルが表示される。モーダルで入力した内容は、フォーマットされてチャンネルに投稿される。

https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/b4dc1a42-5e12-4059-989b-2543d3ca31c3


### `/mokumoku-start`

`/mokumoku-start` でもくもく会のスケジュールと、`/checkin`コマンドの説明を投稿する。

![CleanShot 2024-03-01 at 16 56 51](https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/d709f532-af6d-4345-a875-ab02b4ba4324)

さらに、15:00とTech Talkの開始、17:50にもくもく会終了の通知を行う。

![image](https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/3ab98749-5bbb-40f5-a81b-6900e0f12c3a)
![image](https://github.com/Ibaraki-dev/mokumoku-bot/assets/11070996/3f11d35d-5eb0-4fb7-9046-e2ab43d01282)

### (wip) `/mokumoku-connpass`

`/mokumoku-connpass`で前回のイベントのcheckin内容をもとにconnpassのイベント概要文を作成する。


## ✅ ToDo

- [x] interactionの整理・モジュール化
- [x] modalの送信で、formatした投稿内容をdiscordに送信
- [x] command名をmokuからcheckinに変更
- [x] profile欄のデフォルト値をD1から取得
- [x] huskyかlefthookでcommit時にcheckを実行する
- [x] mainへのpushでCloudflareへデプロイする
- [x] Ibaraki-devのorganizationを作成
- [x] mokumoku-startコマンドの追加
  - [x] コマンド実行でスケジュールと/checkinコマンドの説明を投稿
  - [x] 15:00と17:50の時報機能
- [ ] mokumoku-connpassコマンドの追加
- [ ] READMEに開発方法を追記
- [ ] testの追加
- [ ] commitを整理
- [ ] contribution.mdの追加
- [ ] Zennに記事を執筆
