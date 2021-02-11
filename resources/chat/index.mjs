import alt from 'alt';
import pdata from 'playerdata';

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
    if (msg[0] === '/') {
        var vgname = pdata.getData(player.id, "pName");
        msg = msg.trim().slice(1);

        if (msg.length > 0) {
            alt.log('[chat:cmd] ' + vgname + ': /' + msg);

            let args = msg.split(' ');
            let cmd = args.shift();

            invokeCmd(player, cmd, args);
        }
    } else {
        msg = msg.trim();

        if (msg.length > 0) {
            alt.log('[chat:msg] ' + vgname + ': ' + msg);

            alt.emitClient(null, 'chatmessage', vgname, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
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