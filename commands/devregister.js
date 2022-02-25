const { PrismaClient } = require('@prisma/client');
/**
 * @type {PrismaClient}
 */
const db = require('#db');
const { MessageEmbed, Client, CommandInteraction } = require('discord.js');
const { title } = require('process');


module.exports = {
    name: "devregister",
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
        owner: true,
    },
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
    */
    run: require("./register").run
}