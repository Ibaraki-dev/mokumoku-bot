# Mokumoku Bot

Ibaraki.devのもくもく会で使うDiscord Bot。

## ✅ ToDo

- [x] interactionの整理・モジュール化
- [x] modalの送信で、formatした投稿内容をdiscordに送信
- [x] command名をmokuからcheckinに変更
- [x] profile欄のデフォルト値をD1から取得
- [x] huskyかlefthookでcommit時にcheckを実行する
- [ ] zodでのrequestのvalidationの追加
- [ ] testの追加
- [x] mainへのpushでCloudflareへデプロイする
- [x] Ibaraki-devのorganizationを作成
- [ ] READMEに開発方法を追記
- [ ] Zennに記事を執筆
- [ ] mokumoku-startコマンドの追加
  - [ ] コマンド実行でスケジュールと/checkinコマンドの説明を投稿
  - [ ] 15:00と17:50の時報機能
    - 土日の指定時に常に動かして、DBにその日のcheckinが登録されている場合は、通知するとかで良いかも
