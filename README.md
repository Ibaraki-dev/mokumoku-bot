# Mokumoku Bot

ibaraki.devのもくもく会で使うDiscord Bot。

## ✅ ToDo
- [x] interactionの整理・モジュール化
- [x] modalの送信で、formatした投稿内容をdiscordに送信
- [x] command名をmokuからcheckinに変更
- [ ] profile欄のデフォルト値をD1から取得
  - 参考: https://qiita.com/kmkkiii/items/2b22fa53a90bf98158c0
  - [ ] d1にデータベースを追加
- [ ] huskyかlefthookでcommit時にcheckを実行する
- [ ] zodでのrequestのvalidationの追加
- [ ] testの追加
- [ ] mainへのpushでCloudflareへデプロイする
- [ ] Ibaraki-devのorganizationを作成
- [ ] READMEに開発方法を追記
- [ ] Zennに記事を執筆
- [ ] 時報のためのcronを追加
  - 土日の指定時に常に動かして、DBにその日のcheckinが登録されている場合は、通知するとかで良いかも
