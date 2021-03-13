/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Discord from 'discord.js';

const discordClient = new Discord.Client();
const config = {
    botTokenSecret: process.env['BOT_SECRET'],
    serverId: process.env['SERVER_ID'],
    clientId: process.env['CLIENT_ID'],
    roleWhitelistId: process.env['ROLE_WHITELIST_ID'],
};
var PREFIX = "!";

let whitelist = [];

// Events
discordClient.on('ready', handleReady);
discordClient.on('error', handleError);
discordClient.on('rateLimit', handleRateLimit);
discordClient.on('guildMemberUpdate', handleUserUpdate);

//-----------------------Start Commands-----------------------//
discordClient.on('message', message => {
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
                var mem = discordClient.users.cache.get('591234375828373517');
                console.log()
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Admin System')
                    .setURL(mem.displayAvatarURL())
                    .setAuthor(`<@${'591234375828373517'}>`, mem.avatarURL())
                    .setDescription('@Mahdi بن شد.')
                    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    .addFields({ name: 'دلیل', value: 'چیت.' }, { name: '\u200B', value: '\u200B' }, { name: 'تاریخ بن شدن', value: new Date().toLocaleString(), inline: true }, { name: 'تاریخ ازاد شدن', value: new Date(Date.now() + (args[1] * 86400000)).toLocaleString(), inline: true })
                    .setFooter('Versil Game Log  •  ' + new Date().toLocaleString(), 'https://forum.versil.ir/uploads/monthly_2020_08/facicon.png');

                hook.send('', {
                    username: 'Versil Game',
                    avatarURL: 'https://forum.versil.ir/uploads/monthly_2020_08/facicon.png',
                    embeds: [embed],
                });
            } //else if (args[0] === "kick") {
            //     //kick system

            //     dcom.kick(message, args)
            // } else if (args[0] === 'ban') {
            //     //ban system

            //     dcom.ban(message, args)
            // } else if (args[0] === "giverole") {
            //     //add role system

            //     dcom.giverole(message, args)
            // } else if (args[0] === "getrole") {
            //     //removeSS role system

            //     dcom.getrole(message, args)
            // } else if (args[0] === "changename") {
            //     //removeSS role system

            //     dcom.changename(message, args)
            // }
        } else if (CMD_NAME == "server") {
            // if (args[0] == "makeadmin" || agrs[0 == "ma"]) {
            //     adminsys.makeadmin(player.id, args[])
            // } else if (args[0] == "makeleader" || args[0 == "ml"]) {

            // } else if (args[0] == "sethp") {

            // }

        }
    }

});
//-----------------------End Commands-----------------------//



function handleReady() {
    console.log(`[Whitelist] Discord Bot has Authenticated.`);
    if (!config.botTokenSecret || !config.serverId || !config.clientId || !config.roleWhitelistId) {
        console.error(`Configuration is missing. Please setup your .env file.`);
        return;
    }

}

function handleError(err) {
    console.log(err);
}

function handleRateLimit(err) {
    console.error(`Discord Bot has been Rate Limited. Google 'Rate Limits for Discord'`);
    console.log(err);
}



async function handleUserUpdate(oldUser, user) {
    if (!user) {
        return;
    }

    const server = discordClient.guilds.cache.get(config.serverId);
    const member = await server.members.fetch(user.id);

    if (!member) {
        return;
    }

    const hasRole = member.roles.cache.has(config.roleWhitelistId);
    const index = whitelist.findIndex(id => id === user.id);

    if (!hasRole) {
        if (index <= -1) {
            return;
        }

        whitelist.splice(index, 1);
        alt.log(`[Whitelist] ${member.displayName} was removed from the whitelist.`);
        return;
    }

    if (index >= 0) {
        return;
    }

    whitelist.push(user.id);
    alt.log(`[Whitelist] ${member.displayName} was added to the whitelist.`);
}


function refreshWhitelist() {
    alt.log(`Refreshing Whitelist`);

    whitelist = [];

    const server = discordClient.guilds.cache.get(`${config.serverId}`);
    if (!server) {
        console.error(`Did you forget to invite the bot to your server?`);
        return;
    }

    const members = server.roles.cache.get(config.roleWhitelistId).members.array();

    if (members.length <= 0) {
        alt.log(`No members are whitelisted at this time.`);
        return;
    }

    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        if (!member) {
            continue;
        }

        if (!member.user) {
            continue;
        }

        whitelist.push(member.user.id);
    }

    alt.log(`Refreshed Whitelist. Whitelisted Members: ${members.length}`);
}

export function isjoin(id) {
    const server = discordClient.guilds.cache.get(config.serverId);
    const member = server.members.cache.get(id);
    if (member == undefined) {
        return false
    } else {
        return true
    }
}

export function isWhitelisted(id) {
    console.log(id);

    const server = discordClient.guilds.cache.get(config.serverId);
    const member = server.members.cache.get(id);
    console.log("member: ", member)
    member.roles.add("820242307243704330");

    // if (whitelist.includes(id)) {
    //     return true;
    // }

    return true;
}

export function giveroleverifyed(id) {
    console.log(id);

    if (whitelist.includes(id)) {
        return true;
    }

    return false;
}


export function isWhitelistOn() {
    if (!process.env['ENABLE_WHITELIST'] || process.env['ENABLE_WHITELIST'] === 'false') {
        return false;
    }

    return true;
}

if (isWhitelistOn) {
    discordClient.login(config.botTokenSecret);
}