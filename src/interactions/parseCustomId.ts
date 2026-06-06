export const buildCustomId = (prefix: string, id: number) => `${prefix}:${id}`;

export const parseCustomId = (customId: string, prefix: string) => {
  const [actualPrefix, id] = customId.split(":");

  if (actualPrefix !== prefix || !id) {
    throw new Error("Invalid interaction");
  }

  const parsedId = Number(id);
  if (!Number.isInteger(parsedId)) {
    throw new Error("Invalid interaction");
  }

  return parsedId;
};
