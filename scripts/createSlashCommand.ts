import { parseArgs } from "util";

const main = async () => {
    const { values } = parseArgs({
        args: Bun.argv,
        options: {
            name: {
                type: 'string',
                required: true,
            },
            description: {
                type: 'string',
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
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bot ${Bun.env.DISCORD_TOKEN}`
    }

    const url = `https://discord.com/api/v10/applications/${Bun.env.DISCORD_APPLICATION_ID}/guilds/1110091489469530132/commands`;


    const res = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(json)
    })

    console.log("Command created ✨")
    console.log(await res.json())
}

await main();
