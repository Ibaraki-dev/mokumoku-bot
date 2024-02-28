import { parseArgs } from "util";

const main = async () => {
    const { values } = parseArgs({
        args: Bun.argv,
        options: {
            id: {
                type: 'string',
                required: true,
            },
        },
        strict: true,
        allowPositionals: true,
    });

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bot ${Bun.env.DISCORD_TOKEN}`
    }

    const url = `https://discord.com/api/v10/applications/${Bun.env.DISCORD_APPLICATION_ID}/guilds/${Bun.env.DISCORD_GUILD_ID}/commands/${values.id}`;


    const res = await fetch(url, {
        method: 'DELETE',
        headers: headers,
    })

    console.log("Command deleted ✨")
    console.log(await res.json())
}

await main();
