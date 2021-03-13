import * as alt from 'alt';
import Discord from 'discord.js';
import config from './config.json';
import dcom from './Commands/discord/commands.mjs'
import func from './functions/funcs.mjs';
import adminsys from 'VGadmin';


var PREFIX = config.prefix;
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});
// const commandFolders = fs.readdirSync('./commands');
client.on('message', message => {
    if (message.author.bot) {
        return;
    }
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(" ");
        if (CMD_NAME === "discord") {
            if (args[0] === "test") {
                const member = message.guild.members.cache.get(func.getUserFromMention(args[1]));
                var hook = new Discord.WebhookClient("818015361307246642", "0d_bmgVzAuJuvFC-9WtrWGlhuNiax6xv9M_0EwyRRz6aXotHwoXDik7g_4dxUkERsJLT")
                hook.send(member.avatarURL)


            } else if (args[0] === "kick") {
                //kick system

                dcom.kick(message, args)
            } else if (args[0] === 'ban') {
                //ban system

                dcom.ban(message, args)
            } else if (args[0] === "giverole") {
                //add role system

                dcom.giverole(message, args)
            } else if (args[0] === "getrole") {
                //removeSS role system

                dcom.getrole(message, args)
            } else if (args[0] === "changename") {
                //removeSS role system

                dcom.changename(message, args)
            }
        } else if (CMD_NAME == "server") {
            if (args[0] == "makeadmin" || agrs[0 == "ma"]) {
                adminsys.makeadmin(player.id, args[])
            } else if (args[0] == "makeleader" || args[0 == "ml"]) {

            } else if (args[0] == "sethp") {

            }

        }
    }

});


// export function addhook() {

// }

client.login(config.token);


//-----------------------functions-----------------------//