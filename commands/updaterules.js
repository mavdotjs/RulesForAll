const lib = require('#lib')
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
            lib.editrules(guildid, client, true)
            await interaction.editReply("Done!");
        })()
    }
}