import * as alt from 'alt';
import Discord from 'discord.js';
import config from './config.json';
import dcom from './Commands/discord/commands.mjs'
// import scom from './Commands/server/commands.mjs'
import func from './functions/funcs.mjs';
// import adminsys from 'VGadmin';

var PREFIX = config.prefix;
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});
// const commandFolders = fs.readdirSync('./commands');



client.login(config.token);


//-----------------------functions-----------------------//