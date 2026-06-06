import {
  type APIModalInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10";
import { EDIT_MOKUMOKU_START_CUSTOM_ID } from "../constants";
import type { MokumokuStartFormat } from "../repositories/mokumokuStartFormatsRepository";

export const buildEditMokumokuStartModalResponse = ({
  format,
}: {
  format: MokumokuStartFormat;
}): APIModalInteractionResponse => ({
  type: InteractionResponseType.Modal,
  data: {
    custom_id: EDIT_MOKUMOKU_START_CUSTOM_ID,
    title: "開始投稿を編集",
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.TextInput,
            custom_id: "contentTemplate",
            label: "開始メッセージ（{date}が日付になります）",
            style: TextInputStyle.Paragraph,
            min_length: 1,
            max_length: 512,
            required: true,
            value: format.contentTemplate,
          },
        ],
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.TextInput,
            custom_id: "schedule",
            label: "スケジュール",
            style: TextInputStyle.Paragraph,
            min_length: 1,
            max_length: 1024,
            required: true,
            value: format.schedule,
          },
        ],
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.TextInput,
            custom_id: "checkinCommand",
            label: "checkinコマンド説明",
            style: TextInputStyle.Paragraph,
            min_length: 1,
            max_length: 1024,
            required: true,
            value: format.checkinCommand,
          },
        ],
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.TextInput,
            custom_id: "checkoutCommand",
            label: "checkoutコマンド説明",
            style: TextInputStyle.Paragraph,
            min_length: 1,
            max_length: 1024,
            required: true,
            value: format.checkoutCommand,
          },
        ],
      },
    ],
  },
});
