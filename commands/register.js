const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const { MessageEmbed } = require('discord.js');
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
            if(await db.server.findFirst({where: {id: guildid}})) return interaction.reply(`This server is already registered!`)
            let ok = false
            db.server.create({
                data: {
                    id: guildid,
                    ruleChannelId: interaction.options.getChannel('channel').id,
                    ruleEmbedMessage: (await interaction.options.getChannel('channel').send({
                        embeds: [
                            new MessageEmbed({
                                title: "Rules set up!",
                                description: "There currently are no rules, go anarchy mode i guess"
                            })
                        ]
                    })).id
                }
            }).catch(e => {
                interaction.reply("Bot encountered an error")
                console.error(e)
                ok = true
            }).finally(async ()=>{
                await interaction.options.getChannel("channel").messages.cache.get((await db.server.findFirst({where: {id: guildid}})).ruleEmbedMessage).pin()
                await db.$disconnect();
                if(!ok) {
                    interaction.reply({ content: 'Done!', ephemeral: true })
                }
            })

        })().catch(e => {throw e})
    }
}
