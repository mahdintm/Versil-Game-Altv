import func from './../../functions/funcs.mjs';


//kick system
export function kick(message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply('شما پرمیژن ندارید');
    }
    if (args.length === 0) {
        return message.reply('ای دی وارد کنید');
    }

    const member = message.guild.members.cache.get(func.getUserFromMention(args[1]));
    if (member) {
        member
            .kick()
            .then((member) => message.channel.send(`${member} was Kicked`))
            .catch((err) => message.channel.send(`I can not Kick this user : ${member}`))
    } else {
        message.channel.send("This user was not found")
    }
}

export function ban(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply("You do not have permissions to use that command");
    }
    try {
        const user = message.guild.members.ban(func.getUserFromMention(args[1]));
        message.channel.send('User was banned successfully');
    } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found');
    }
}

export function giverole(message, args) {
    const member = message.guild.members.cache.get(func.getUserFromMention(args[1]));
    const role = message.guild.roles.cache.get(func.getRoleFromMention(args[2]));
    if (member) {
        if (role) {
            console.log("staff selected")
            member.roles.add(role);
        } else {
            console.log("error role not found")
        }
    } else {
        console.log("error user not found")
    }
}

export function getrole(message, args) {
    const member = message.guild.members.cache.get(func.getUserFromMention(args[1]));
    const role = message.guild.roles.cache.get(func.getRoleFromMention(args[2]));
    if (member) {
        if (role) {
            console.log("Role added")
            member.roles.remove(role);
        } else {
            console.log("error role not found")
        }
    } else {
        console.log("error user not found")
    }
}

export default { kick, ban, giverole, getrole }