const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const { Client, MessageEmbed } = require('discord.js');

/**
 * @description Edits the server rules messah
 * @param {String} svid
 * @param {Client} client
 */
module.exports.editrules = function(svid, client) {
    (async()=>{
        const server = await db.server.findFirst({
            where: {
                id: svid
            },
            select: {
                rules: true,
                ruleChannelId: true,
                ruleEmbedMessage: true
            }
        })
        const guild = client.guilds.cache.get(svid)
        const channel = guild.channels.cache.get(server.ruleChannelId)
        const message = await channel.messages.fetch(server.ruleEmbedMessage)
        console.log(message)
        message.edit({ embeds: [
            new MessageEmbed({
                title: "Rules",
                fields: [
                    ...server.rules.map(r=>{
                        return {
                            name: `Rule ${r.Number}.${r.Title?` ${r.Title}`:''}`,
                            value: r.Info
                        }
                    })
                ]
            })
        ]})
    })()
}