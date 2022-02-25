const { Client, CommandInteraction } = require('discord.js');


module.exports = {
    name: "perms",
    description: "Gets the permissions for a channel, for debugging",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The channel to check for.",
            required: true
        },
    ],
    limits: {
        owner: true,
    },
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
    */
    run: (client, interaction) => {
        const channel = interaction.options.getChannel('channel');
        console.log(interaction.guild.me.permissionsIn(channel.id).toArray())
        (async()=>{
            await interaction.deferReply()
            await interaction.editReply("Check logs!")
        })()
    }
}