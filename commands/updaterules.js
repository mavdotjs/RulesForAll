const lib = require('#lib')
const db = require('#db')
const { Client, CommandInteraction } = require('discord.js')
module.exports = {
    name: 'update',
    description: 'Update rules embed, mainly used for debug purposes',
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
            await interaction.deferReply();
            await lib.update(db.rule,
                {
                    where: {
                        serverId: guildid
                    }
                },
                (rule, ruleindex ,id)=>{
                    return {
                        number: parseInt(ruleindex) + 1
                    }
                }, "id")
            await interaction.editReply("Done!");
            lib.editrules(guildid, client, true)
        })().catch(async e => {
            console.log(e)
            try {
                await interaction.reply("An error ocurred")
            } catch {
                await interaction.editReply("An error ocurred")
            }
        })
    }
}