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
        client.user.setActivity("The rules", { type: "LISTENING" });
    }
}