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
                if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change your nickname!');
                const member = message.guild.members.cache.get(func.getUserFromMention(args[1]));
                if (member) {
                    console.log("Name Changed")
                    member.setNickname(args[2]);
                } else {
                    console.log("error user not found")
                }

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
// if (message.content === 'hello') {

// }
// });

client.login(config.token);


//-----------------------functions-----------------------//