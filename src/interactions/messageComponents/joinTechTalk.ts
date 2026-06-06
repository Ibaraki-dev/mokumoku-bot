import { InteractionResponseType } from "discord-api-types/v10";
import { JOIN_TECH_TALK_CUSTOM_ID } from "../../constants";
import { buildTechTalkAnnouncementMessage } from "../../responses/techTalkAnnouncementResponse";
import type { Repositories } from "../../types";
import type { MessageComponentObj } from "../handleMessageComponents";

const handler = async ({
  messageComponentObj,
  repositories: { techTalkSpeakersRepository },
}: {
  messageComponentObj: MessageComponentObj;
  repositories: Repositories;
}) => {
  if (!messageComponentObj.member) {
    throw new Error("Invalid interaction");
  }

  await techTalkSpeakersRepository.join({
    messageId: messageComponentObj.message.id,
    discordUserId: messageComponentObj.member.user.id,
    displayName:
      messageComponentObj.member.nick ??
      messageComponentObj.member.user.global_name ??
      messageComponentObj.member.user.username,
  });
  const speakers = await techTalkSpeakersRepository.listByMessageId(
    messageComponentObj.message.id,
  );

  return {
    type: InteractionResponseType.UpdateMessage,
    data: buildTechTalkAnnouncementMessage({ speakers }),
  };
};

export default {
  customId: JOIN_TECH_TALK_CUSTOM_ID,
  handler,
};
