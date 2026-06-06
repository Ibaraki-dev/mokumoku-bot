import { parseArgs } from "util";

const main = async () => {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      name: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
        required: true,
      },
    },
    strict: true,
    allowPositionals: true,
  });

  const json = {
    name: values.name,
    type: 1,
    description: values.description,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
  };

  const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APPLICATION_ID}/guilds/${process.env.DISCORD_GUILD_ID}/commands`;

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    console.error("Failed to create command", await res.json());
    process.exit(1);
  }

  console.log("Command created ✨");
  console.log(await res.json());
};

await main();
