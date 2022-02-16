const db = require('#db');
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
    run: (client, interaction) => {
        (async() => {
            const guildid = interaction.guildId;
            let ok = false
            db.server.create({
                data: {
                    id: guildid,
                    ruleChannelId: interaction.options.getChannel('channel').id
                }
            }).catch(e => {
                switch(e.code) {
                    case "P2002":
                        interaction.reply("This server has already registered!")
                        break
                }
                ok = true
            }).finally(async ()=>{
                await db.$disconnect();
                if(!ok) {
                    interaction.reply('Done!')
                }
            })
        })().catch(e => {throw e})
    }
}
