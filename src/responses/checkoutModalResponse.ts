import {
  type APIModalInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10";
import { CHECKOUT_MODAL_CUSTOM_ID } from "../constants";

export const buildCheckoutModalResponse = ({
  todo,
}: {
  todo: string;
}): APIModalInteractionResponse => {
  return {
    type: InteractionResponseType.Modal,
    data: {
      custom_id: CHECKOUT_MODAL_CUSTOM_ID,
      title: "チェックアウト",
      components: [
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
              placeholder: "checkinで入力した内容が表示されます",
              value: todo,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              custom_id: "content",
              label: "今日やったこと",
              style: TextInputStyle.Paragraph,
              min_length: 1,
              max_length: 512,
              required: true,
              placeholder: "* 新しい機能が実装できた🚀\n* 技術書を読んだ📚",
            },
          ],
        },
      ],
    },
  };
};
