const { PrismaClient, prisma } = require('@prisma/client');
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
module.exports.editrules = function(svid, client, disc=false) {
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
        if(disc) {
            db.$disconnect();
        }
        const guild = client.guilds.cache.get(svid)
        const channel = guild.channels.cache.get(server.ruleChannelId)
        const message = await channel.messages.fetch(server.ruleEmbedMessage)
        message.edit({ embeds: [
            new MessageEmbed({
                title: `Rules`,
                description: server.rules.length?"":"There currently are no rules, go anarchy mode i guess",
                fields: [
                    ...(server.rules.length?server.rules.map(r=>{
                        return {
                            name: `Rule ${r.number}.${r.title?` ${r.title}`:''}`,
                            value: r.info
                        }
                    }):[])
                ]
            })
        ]})
    })()
}



module.exports.update = async function update(model, data, updator, idname="id") {
    if(!model.findMany) throw new Error("model parameter must be a Prisma Model");
    const things = await model.findMany(data);
    for(let thing in things) {
        const datathing = things[thing]
        if(!thing[idname]) throw new Error("id parameter invalid");
        let newthing = updator(datathing, thing, thing[idname]);
        if(!newthing) console.log('Updator returned none')
        let payload = {
            where: {

            },
            data: {
                ...newthing
            }
        }
        payload.where[idname] = thing[idname]
        await model.update(payload)
    }
};

module.exports.wait = t => new Promise((rs, rj) => setTimeout(rs, t))