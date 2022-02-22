const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const lib = require('#lib')
const { Client, CommandInteraction } = require('discord.js');
module.exports = {
    name: 'removerule',
    description: 'Removes a rule by its number',
    options: [
        {
            type: 4,
            name: "rule",
            description: "Rule number to delete.",
            required: true
        }
    ],
    limits: {
        owner: false,
        permissions: ["MANAGE_GUILD"]
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
            if(!await db.server.findFirst({ where: { id: guildid } })) return await interaction.reply('This server is not registered!');
            const guildata = await db.server.findFirst({ where: { id: guildid }, select: { rules: true } })
            await interaction.deferReply()
            if(interaction.options.getInteger('rule') > guildata.rules.length) return interaction.editReply({ content: "That Rule number doesnt exist!", ephemeral: true })
            db.rule.delete({
                where: {
                    serverId_number: { serverId: guildid, number: interaction.options.getInteger('rule') },
                }
            }).catch(e=>{
                interaction.editReply('command ran into an error')
                console.error(e)
                ok = true
            }).finally(async()=>{
                db.$disconnect()
                await lib.update(db.rule, {
                    where: {
                        number: {
                            gt: interaction.options.getInteger('rule')
                        }   
                    }
                }, (rule, ruleindex ,id)=>{
                    return {
                        number: ruleindex + 1
                    }
                }, "id")
                lib.editrules(guildid, client)
                if(!ok) {interaction.editReply({ content: 'Deleted!', ephemeral: true }).catch(()=>{
                    console.error("An error ocurred")
                })}
            })
        })()
    }
}