import * as alt from 'alt';
import Discord from 'discord.js';
import config from './config.json';
import dcom from './Commands/discord/commands.mjs'
// import scom from './Commands/server/commands.mjs'
import func from './functions/funcs.mjs';


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
                var hook = new Discord.WebhookClient("818015361307246642", "0d_bmgVzAuJuvFC-9WtrWGlhuNiax6xv9M_0EwyRRz6aXotHwoXDik7g_4dxUkERsJLT")

                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Admin System')
                    .setURL('https://discord.js.org/')
                    .setAuthor('Mahdi Nemati', 'http://versil.ir/avatar.jpg', 'https://discord.js.org')
                    .setDescription('@Mahdi بن شد.')
                    .setThumbnail()
                    .addFields({ name: 'دلیل', value: 'چیت.' }, { name: '\u200B', value: '\u200B' }, { name: 'تاریخ بن شدن', value: 'xxxx/xx/xx', inline: true }, { name: 'تاریخ ازاد شدن', value: 'xxxx/xx/xx', inline: true })
                    .setTimestamp()
                    .setFooter('Versil Game Log', 'https://forum.versil.ir/uploads/monthly_2020_08/facicon.png');

                hook.send('Webhook test', {
                    username: 'Versil Game',
                    avatarURL: 'https://forum.versil.ir/uploads/monthly_2020_08/facicon.png',
                    embeds: [embed],
                });
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
            // if (args[0] === "sethp") {
            //     scom.sethp(message, args);
            // }

        }
    }

});




client.login(config.token);


//-----------------------functions-----------------------//