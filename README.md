Simple rules bot for discord servers, easy setup  
[![Discord Bots](https://top.gg/api/widget/943502294136291388.svg)](https://top.gg/bot/943502294136291388)
<a href="https://discordbotlist.com/bots/943502294136291388"><img src="https://discordbotlist.com/api/v1/bots/943502294136291388/widget"></a>

all commands:  
* `register [channel] [role] [autorole?]`: Registers the current guild, must be ran first for any other command to work  
* `addrule [title] [description]`: Adds a new rule  
* `removerule [index]`:  Removes a rule by its number  
* `rule [number]`:  Shows a rule by its number  
* `update`: Update rules embed (bot owner only)

This project is currently dormant until I am allowed to access discord (personal family problem), but when I come back:

* Dashboard With SvelteKit
* Dashboard on Vercel, Bot on Railway (or replit maybe), internal communication via Ably
* Bug fixes (i dont know what the bugs are yet tho)
* New dev team
* Moderation and appeals system based off of the rules

Future commands:
* `ban [user] [time] [rules]`: bans a user & record messages by that user
* `register [channel] [role] [autorole?] [(optional) appealchannel]`: If appealchannel is empty appeals will be turned off and can only be re-enabled via dasboard
* `appeal [reason]`: allows a user to appeal a ban (the bot doesnt technically ban the user in discord terms but puts them in a `RuFoAl-/purgatory` channel)
* `dashboard`: sends the link to the dashboard
