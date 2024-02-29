import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MOKUMOKU_START_COMMAND_NAME } from "../../constants";
import { buildMokumokuCommandResponse as buildMokumokuStartCommandResponse } from "../../responses/mokumokuStartCommandResponse";

dayjs.extend(utc);
dayjs.extend(tz);

const handler = async () => {
  const today = dayjs.tz("Asia/Tokyo").format("YYYY/MM/DD");
  return buildMokumokuStartCommandResponse({ date: today });
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
