# Mokumoku Bot

Ibaraki.devのもくもく会で使うDiscord Bot。

## 🚀 Features

### チェックイン `/checkin`

`/checkin` で自己紹介と今日やることを入力するモーダルが表示される。モーダルで入力した内容は、フォーマットされてチャンネルに投稿される。

### (WIP) スタート `/mokumoku-start`

`/mokumoku-start` でもくもく会のスケジュールと、`/checkin`コマンドの説明を投稿する。さらに、15:00とTech Talkの開始、17:50にもくもく会終了の通知を行う。

## ✅ ToDo

- [x] interactionの整理・モジュール化
- [x] modalの送信で、formatした投稿内容をdiscordに送信
- [x] command名をmokuからcheckinに変更
- [x] profile欄のデフォルト値をD1から取得
- [x] huskyかlefthookでcommit時にcheckを実行する
- [x] mainへのpushでCloudflareへデプロイする
- [x] Ibaraki-devのorganizationを作成
- [ ] READMEに開発方法を追記
- [ ] testの追加
- [ ] commitを整理
- [ ] contribution.mdの追加
- [ ] Zennに記事を執筆
- [ ] mokumoku-startコマンドの追加
  - [ ] コマンド実行でスケジュールと/checkinコマンドの説明を投稿
  - [ ] 15:00と17:50の時報機能
    - 土日の指定時に常に動かして、DBにその日のcheckinが登録されている場合は、通知するとかで良いかも
