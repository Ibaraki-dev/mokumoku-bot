import {
  APIModalInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10";
import { CHECKIN_MODAL_CUSTOM_ID } from "../constants";

export const buildCheckinModalResponse = (
  prevProfile?: string,
): APIModalInteractionResponse => {
  return {
    type: InteractionResponseType.Modal,
    data: {
      custom_id: CHECKIN_MODAL_CUSTOM_ID,
      title: "もくもくBOT",
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              custom_id: "profile",
              label: "自己紹介",
              style: TextInputStyle.Paragraph,
              min_length: 1,
              max_length: 512,
              required: true,
              value: prevProfile,
              placeholder:
                "山田太郎です。水戸でエンジニアをしています。",
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              custom_id: "todo",
              label: "今日やること",
              style: TextInputStyle.Paragraph,
              min_length: 1,
              max_length: 512,
              required: true,
              placeholder: "* 新しい機能の実装\n* 技術書を読む",
            },
          ],
        },
      ],
    },
  };
};
