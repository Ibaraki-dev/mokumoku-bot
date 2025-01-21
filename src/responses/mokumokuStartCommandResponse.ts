import {
  APIModalInteractionResponse,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
} from "discord-api-types/v10";
import { MOKUMOKU_START_MODAL_CUSTOM_ID } from "../constants";

export const buildMokumokuStartCommandResponse = ({
  prevName,
  prevSchedule,
}: {
  prevName?: string;
  prevSchedule?: string;
}): APIModalInteractionResponse => {
  return {
    type: InteractionResponseType.Modal,
    data: {
      custom_id: MOKUMOKU_START_MODAL_CUSTOM_ID,
      title: "イベント概要",
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              custom_id: "name",
              label: "イベント名",
              style: TextInputStyle.Short,
              min_length: 1,
              max_length: 512,
              required: true,
              value: prevName,
              placeholder: "LAPRASもくもく会",
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              custom_id: "schedule",
              label: "イベントスケジュール",
              style: TextInputStyle.Paragraph,
              min_length: 1,
              max_length: 512,
              required: true,
              value: prevSchedule,
              placeholder: "* 18:30〜19:00 受付\n* 19:00〜21:00 もくもく作業",
            },
          ],
        },
      ],
    },
  };
};
