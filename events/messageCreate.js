const { Client, Message } = require("discord.js");
const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
module.exports = {
    name: "messageCreate",
    settings: {
        once: false
    },
    /**
     * 
     * @param {Client} client 
     * @param {Message} message
     */
    run: (client, message) => {
        (async()=>{
            if(!message.author.bot) return;
            if(!(message.author.id === client.user.id)) return;
            const guildId = message.guildId;
            const server = await db.server.findFirst({ where: { id: guildId } })
            if(!server) return;
            if(message.id === server.ruleEmbedMessage) {
                await message.pin()
            } else if(message.id === server.ruleAcceptMessage) {
                await message.react("✅")
            }
        })()
    }
}