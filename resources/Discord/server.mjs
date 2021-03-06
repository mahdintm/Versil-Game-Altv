import * as alt from 'alt';
import Discord from 'discord.js';
import config from './config.json';

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    var prefix = config.prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
});

client.login(config.token);