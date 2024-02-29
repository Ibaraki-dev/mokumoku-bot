import { MOKUMOKU_START_COMMAND_NAME } from "../../constants";
import { buildMokumokuCommandResponse as buildMokumokuStartCommandResponse } from "../../responses/mokumokuStartCommandResponse";

const handler = async () => {
  return buildMokumokuStartCommandResponse({ date: "2024/02/29" });
  /*
  その他メモ
  * スタートしたという事実をDBに保存する？
    * その場合重複で起動した場合はどうする？
      * 重複起動はハンドリングすればいいか
    * 使い道が時報の時に参照するくらい？
      * 事実をDBに保存しなくても当時にcheckinのレコードがある場合はという条件でも良いかもしれない
        * でもそれもイマイチかもなー。。
      * checkinをもくもく会に紐づけたいな
    * mokumoku-startの前にcheckinを実行したら？
      * そしたらエラーを返せばいいか。先にmokumokou-startをしてくださいと
  */
};

export default {
  commandName: MOKUMOKU_START_COMMAND_NAME,
  handler,
};
