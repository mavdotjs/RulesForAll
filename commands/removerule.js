const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const lib = require('#lib')
const { Client, CommandInteraction } = require('discord.js')
module.exports = {
    name: 'addrule',
    description: 'Removes a rule',
    options: [
        {
            type: 4,
            name: "rule",
            description: "Rule number to delete",
            required: true
        }
    ],
    limits: {
        owner: false,
        permissions: ["MANAGE_SERVER"]
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
            await interaction.deferReply()
            if(interaction.options.getInteger('rule') > guildata.rules.length) return interaction.reply({ content: "That Rule number doesnt exist!", ephemeral: true })
            db.rule.delete({
                where: {
                    Number: interaction.options.getInteger('rule'),
                    serverId: guildid,
                }
            }).catch(e=>{
                interaction.reply('command ran into an error')
                console.error(e)
                ok = true
            }).finally(()=>{
                db.$disconnect()
                lib.editrules(guildid, client)
                if(!ok) {interaction.editReply({ content: 'Deleted!', ephemeral: true }).catch(()=>{
                    console.error("An error ocurred")
                })}
            })
        })()
    }
}