const { Client, MessageReaction, User } = require("discord.js");
const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const { wait } = require("../lib");
async function remove(reaction, user) {
    reaction.users.remove(user.id).catch(async e => {
        await wait(2000)
        reaction.users.remove(user.id).catch()
    });
}

module.exports = {
    name: "messageReactionAdd",
    settings: {
        once: false
    },
    /**
     * 
     * @param {Client} client 
     * @param {MessageReaction} reaction
     * @param {User} user
     */
    run: (client, reaction, user) => {
        if(user.bot) return;
        const guildId = reaction.message.guildId;
        (async() => {
            // Check if the reaction is the accept emoji
            // Fetch server and check if it exists (aka is registered)
            const server = await db.server.findFirst({where: {id: guildId}});
            if(!server) return // server not registered, ignore
            if(reaction.message.id !== server.ruleAcceptMessage) return // wrong message, ignore
            if(!(reaction.emoji.name === "✅")) return await remove(reaction, user)
            // Server is registered and emoji is correct, there should be no errors past this point

            // server is the row in the RulesForAll DB, guild is the corresponding row in the discord DB
            const guild = await client.guilds.fetch(server.id);
            const role = await guild.roles.fetch(server.ruleAcceptRole);
            const member = await guild.members.fetch(user.id)
            member.roles.add(role, "User verified, added rule accept role").catch(e=>0);

            // Remove reaction
            await remove(reaction, user)
        })()
    }
}