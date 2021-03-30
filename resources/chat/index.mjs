import alt from 'alt';
import pdata from 'playerdata';
import antifosh from 'VGantifosh'

let cmdHandlers = {};

function invokeCmd(player, cmd, args) {
    const callback = cmdHandlers[cmd];

    if (callback) {
        callback(player, args);
    } else {
        send(player, `{FF0000} Unknown command /${cmd}`);
    }
}

alt.onClient('chatmessage', (player, msg) => {
    var vgname = pdata.getplayername(player.id);
    if (msg[0] === '/') {
        msg = msg.trim().slice(1);

        if (msg.length > 0) {
            alt.log('[chat:cmd] ' + vgname + ': /' + msg);

            let args = msg.split(' ');
            let cmd = args.shift();

            invokeCmd(player, cmd, args);
        }
    } else {
        msg = msg.trim();
        let fmsg = antifosh.findfosh(msg)
        if (msg.length > 0) {
            alt.log('[chat:msg] ' + vgname + ': ' + msg);

            alt.emitClient(null, 'chatmessage', vgname, fmsg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
        }
    }
});

export function send(player, msg) {
    alt.emitClient(player, 'chatmessage', null, msg);
}

export function broadcast(msg) {
    send(null, msg);
}

export function registerCmd(cmd, callback) {
    if (cmdHandlers[cmd] !== undefined) {
        alt.logError(`Failed to register command /${cmd}, already registered`);
    } else {
        cmdHandlers[cmd] = callback;
    }
}

export default { send, broadcast, registerCmd };