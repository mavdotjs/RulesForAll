const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const lib = require('#lib')
const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
module.exports = {
    name: 'rule',
    description: 'View a rule',
    options: [
        {
            type: 4,
            name: "rule",
            description: "The rule to be viewed",
            required: true
        }
    ],
    limits: {
        owner: false,
        permissions: ["SEND_MESSAGES"]
    },
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: (client, interaction) => {
        (async() => {
            const guildid = interaction.guildId;
            let ok = false
            if(!await db.server.findFirst({ where: { id: guildid } })) return interaction.reply(`This server is not registered!`)
            const guildata = await db.server.findFirst({ where: { id: guildid }, select: { rules: true } })
            if(interaction.options.getInteger('rule') > guildata.rules.length) return interaction.reply({ content: "That Rule number doesnt exist!", ephemeral: true })
            db.rule.findFirst({
                where: {
                    number: interaction.options.getInteger('rule'),
                    serverId: guildid,
                }
            }).catch(e=>{
                interaction.reply('command ran into an error')
                console.error(e)
                ok = true
            }).then(async d=>{
                db.$disconnect()
                await interaction.deferReply(); // cuz y not
                await interaction.editReply({ embeds: [
                    new MessageEmbed({
                        title: `Rule ${d.number}.${d.title?` ${d.title}`:''}`,
                        description: d.itnfo,
                    })
                ] })
            })
        })()
    }
}