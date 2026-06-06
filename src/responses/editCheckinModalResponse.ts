import {
  type APIModalInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10";
import { EDIT_CHECKIN_CUSTOM_ID } from "../constants";
import { buildCustomId } from "../interactions/parseCustomId";

export const buildEditCheckinModalResponse = ({
  checkinId,
  profile,
  todo,
}: {
  checkinId: number;
  profile: string;
  todo: string;
}): APIModalInteractionResponse => ({
  type: InteractionResponseType.Modal,
  data: {
    custom_id: buildCustomId(EDIT_CHECKIN_CUSTOM_ID, checkinId),
    title: "チェックインを編集",
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
            value: profile,
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
            value: todo,
          },
        ],
      },
    ],
  },
});
