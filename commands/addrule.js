const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const lib = require('#lib')
const { Client, CommandInteraction } = require('discord.js')
module.exports = {
    name: 'addrule',
    description: 'Add a new rule',
    options: [
        {
            type: 3,
            name: "title",
            description: "A title for your rule",
            required: true
        },
        {
            type: 3,
            name: "description",
            description: "A description for your rule",
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
            db.rule.create({
                data: {
                    Number: guildata?.rules?.length + 1,
                    Title: interaction.options.getString("title"),
                    Info: interaction.options.getString("description"),
                    serverId: guildid
                }
            }).catch(e=>{
                interaction.reply('command ran into an error')
                console.error(e)
                ok = true
            }).finally(()=>{
                db.$disconnect()
                lib.editrules(guildid, client)
                if(!ok) {interaction.reply({ content: `Created Rule ${guildata?.rules?.length}!`, ephemeral: true }).catch(()=>{
                    console.error("An error ocurred")
                })}
            })
        })()
    }
}