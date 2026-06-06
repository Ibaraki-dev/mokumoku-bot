import {
  type APIInteractionGuildMember,
  PermissionFlagsBits,
} from "discord-api-types/v10";

export const isAdmin = (member: APIInteractionGuildMember) => {
  return (
    (BigInt(member.permissions) & PermissionFlagsBits.Administrator) ===
    PermissionFlagsBits.Administrator
  );
};
