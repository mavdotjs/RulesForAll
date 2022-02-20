const { Client } = require("discord.js");
module.exports = {
    name: "ready",
    settings: {
        once: false
    },
    /**
     * 
     * @param {Client} client 
     */
    run: (client) => {
        console.log("I'm online!");
        const presence = [
            { type: 'PLAYING', name: 'with pixelbot' },
            { type: 'LISTENING', name: 'the rules' }
        ]
        let current_presence = 0
        function update() {
            current_presence++;
            const random = Math.random();
            const random2 = random * presence.length 
            const randomFloor = Math.floor(random2);
            const activity = presence[randomFloor]
            client.user.setPresence({ activities: [activity], status: 'idle' });
        }
        setInterval(update, 16000)
        client.guilds.cache.forEach(guild => {
            console.log(`${guild.name} | ${guild.id}`);
        })
    }
}