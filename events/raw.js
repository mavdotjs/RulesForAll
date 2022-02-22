const avail_events = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove"
}
module.exports = {
    name: "raw",
    settings: {
        once: false
    },
    /**
     * 
     * @param {Client} client 
     */
    run: (client, event) => {
        (async() => {
            // console.log(`Raw event: {${event.t}}`)

            if(event.t === "MESSAGE_CREATE") {
                const { d: data } = event;
                const channel = await client.channels.fetch(data.channel_id)
                const message = await channel.messages.fetch(data.id)
                client.emit("messageCreate", message)
            }

            if(!avail_events.hasOwnProperty(event.t)) return;

            const { d: data } = event;
            const user = await client.users.fetch(data.user_id)
            const channel = await client.channels.fetch(data.channel_id)
    
            // message is already in cache and doesnt event doesnt need to be emitted
            if((await channel.messages.fetch()).has(data.message_id)) return;
    
            const message = await channel.messages.fetch(data.message_id)
            const emojiKey = data.emoji.id? data.emoji.id:data.emoji.name;
            const reaction = await message.reactions.fetch(emojiKey);

            client.emit(avail_events[event.t], reaction, user)
        })()
    }
}