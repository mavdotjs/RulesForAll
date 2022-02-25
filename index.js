import('dotenv').then(d => d.config());
const OPCommands = require('maverick-opcommands');
const Discord = require('discord.js')
const intents = new Discord.Intents(32767);
const client = new Discord.Client({
    intents
});

const handler = new OPCommands(client, {
    commandsDir: "commands", // your commands' directory
    eventsDir: "events", // your events' directory
    testGuildID: "935949267904921710", // the ID of the Test Server
    testMode: false, // should OPCommands start in test mode (guild only)?
    logs: true, // should OPCommands log its actions?
    notifyOwner: false // should OPCommands notify the bot owner(s) when the bot goes online?
});
handler.setBotOwner("688874082523152483"); // sets the bot's owner(s), can be an array or a string
handler.addBotOwner("290545409481244672");
handler.setMessages({
    ownerOnly: (interaction) => interaction.reply("Missing **Bot Owner** permission."),
    permissions: (interaction, perms) => interaction.reply(`You are missing the following permissions: **${perms.join(", ")}**`),
    cooldown: (interaction, cooldown) => interaction.reply(`You must wait **${cooldown}** before executing another command.`),
    notifyOwnerMessage: (owner) => {
        owner.createDM();
        owner.send("I'm online!");
    }
}); // sets the limit messages, not required

client.on('messageCreate', async (message) => {
    if (message.author.bot && message.type === 'CHANNEL_PINNED_MESSAGE') {
      message.delete().catch(e=>null);
    }
})

client.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop: for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    await channel.send(`
Thanks for inviting me into this server!
To Prevent any errors during setup, make sure that I have the following permissions in your rules channel:
Send Messages,
Manage Messages,
Add Reactions,
Embed Links,
Attach Files.
As well as putting me above your verification role so i can add users.
`);
});

client.login(process.env.BOT_TOKEN);