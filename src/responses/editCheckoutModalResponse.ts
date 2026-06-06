import {
  type APIModalInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10";
import { EDIT_CHECKOUT_CUSTOM_ID } from "../constants";
import { buildCustomId } from "../interactions/parseCustomId";

export const buildEditCheckoutModalResponse = ({
  checkoutId,
  content,
}: {
  checkoutId: number;
  content: string;
}): APIModalInteractionResponse => ({
  type: InteractionResponseType.Modal,
  data: {
    custom_id: buildCustomId(EDIT_CHECKOUT_CUSTOM_ID, checkoutId),
    title: "チェックアウトを編集",
    components: [
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
            value: content,
          },
        ],
      },
    ],
  },
});
