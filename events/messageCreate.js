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
            if(!message.author.bot) return console.log("test 1 fail");
            if(!(message.author.id === client.user.id)) return console.log("test 2 fail");
            const guildId = message.guildId;
            await new Promise(r => setTimeout(r, 2000))
            const server = await db.server.findFirst({ where: { id: guildId } })
            if(!server) return console.log("test 3 fail");
            if(message.id === server.ruleEmbedMessage) {
                console.log("rule embed created")
                await message.pin()
            } else if(message.id === server.ruleAcceptMessage) {
                console.log("accept rule embed created")
                await message.react("✅")
            }
        })().then(()=>{
            db.$disconnect();
        })
    }
}