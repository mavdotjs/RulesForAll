const db = require('#db')
module.exports = {
    name: "register",
    description: "registers this server in the RulesForAll system",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The channel rules go in",
            required: true
        }
    ],
    limits: {
        owner: false,
        permissions: ["MANAGE_SERVER"]
    },
    run: async(client, interaction) => {
        await db.$connect()
        const guildid = interaction.guildId;
        await db.server.create({
            id: guildid
        })
        await db.$connect();
        interaction.reply('Finished')
    }
}