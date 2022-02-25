const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const { MessageEmbed, Client, CommandInteraction } = require('discord.js');


module.exports = {
    name: "register",
    description: "Registers the current guild, must be ran first for any other command to work",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The channel rules go in.",
            required: true
        },
        {
            type: 8,
            name: "role",
            description: "The role users get when they accept the rules.",
            required: true
        },
        {
            type: 5,
            name: "autorole",
            description: "Autoroles all existing members, This is in beta and may not work in some situations",
            required: false
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
            const role = interaction.options.getRole('role');
            const channel = interaction.options.getChannel('channel');
            console.log(interaction.guild.me.permissionsIn(channel.id).toArray())
            if(!interaction.guild.me.permissionsIn(channel.id).has("MANAGE_MESSAGES")) return await interaction.reply(`The bot doesnt have access to manage or send messages in <#${channel.id}>, please add the permissions "Send Messages" and "Manage Messages" in <#${channel.id}>`)
            try {
                // check if bot can send and delete in the channel
                await (await channel.send("Test Message")).delete()
            } catch {
                return await interaction.reply(`The bot doesnt have access to manage or send messages in <#${channel.id}>, please add the permissions "Send Messages" and "Manage Messages" in <#${channel.id}>`)
            }
            if(!role.editable) return await interaction.reply(`The Bot cannot apply users the <@!${role.id}> role, please make the RulesForAll role higher than it for this to work`)
            if(await db.server.findFirst({where: {id: guildid}})) return interaction.reply(`This server is already registered!`)
            await interaction.deferReply();
            let ok = false
            db.server.create({
                data: {
                    id: guildid,
                    ruleChannelId: channel.id,
                    ruleEmbedMessage: (await channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Rules set up!",
                                description: "There currently are no rules, go anarchy mode i guess"
                            })
                        ]
                    })).id,
                    ruleAcceptMessage: (channel.send({
                        embeds: [
                            new MessageEmbed({
                                title: "Accept the rules",
                                description: "React with :white_check_mark: to accept the rules"
                            })
                        ]
                    })).id,
                    ruleAcceptRole: role.id
                }
            }).catch(async e => {
                await interaction.editReply("Bot encountered an error")
                console.error(e)
                ok = true
            }).finally(async ()=>{
                await db.$disconnect();
                if(interaction.options.getBoolean("autorole")) {
                    const users = await interaction.guild.members.fetch();
                    for(let [id, user] of users) {
                        user.roles.add(role, "Auto-Role").catch(e=>console.log(e))
                    }
                }
                if(!ok) {
                    await interaction.editReply({ content: 'Done!', ephemeral: true });
                }
            })

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