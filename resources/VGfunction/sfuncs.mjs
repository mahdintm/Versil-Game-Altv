import * as alt from 'alt';
import pdata from 'playerdata';
import chat from 'chat';
import serverdata from '../db/config.json';
var Ids = {};

setInterval(() => {
    var timeNow = new Date();
    var nowHoure = timeNow.getHours();
    var nowMinute = timeNow.getMinutes();
    var nowSecond = timeNow.getSeconds()
    if (nowMinute < 1 && nowSecond < 1) {
        rasesaat()
    }
}, 1000);

function rasesaat() {

}
alt.on("adminwarn", (player, msg, msgdiscord) => {
    alt.emit('sendhookadminwarn', player, msgdiscord);
    adminwarn(pdata.getplayername(player.id), msg)
})

export function adminchat(adminname, msg) {
    let play;
    for (let i = 0; i < serverdata.max_player; i++) {
        if (pdata.getpinfo(i) != undefined) {
            if (pdata.getData(i, "pAdmin") >= 1) {
                play = alt.Player.getByID(i);
                if (pdata.getData(play.id, "pAdmin") == 10) {
                    chat.send(play, `{BBDE42}AdminChat: {fcb212}${adminname}{ff2b2b} (Founder){fcb212}: {ffffff}${msg}`);
                } else if (pdata.getData(play.id, "pAdmin") == 9) {
                    chat.send(play, `{BBDE42}AdminChat: {fcb212}${adminname}(Manager): {ffffff}${msg}`);
                } else if (pdata.getData(play.id, "pAdmin") == 8) {
                    chat.send(play, `{BBDE42}AdminChat: {fcb212}${adminname}(Supervisor): {ffffff}${msg}`);
                } else if (pdata.getData(play.id, "pAdmin") == 7) {
                    chat.send(play, `{BBDE42}AdminChat: {fcb212}${adminname}(Support): {ffffff}${msg}`);
                } else if (pdata.getData(play.id, "pAdmin") == 6) {
                    chat.send(play, `{BBDE42}AdminChat: {fcb212}${adminname}(Assistant): {ffffff}${msg}`);
                } else {
                    chat.send(play, `{BBDE42}AdminChat: {fcb212}${adminname} : {ffffff}${msg}`);
                }
            }
        }
    }
}
export function adminwarn(adminname, msg) {
    let play;
    for (let i = 0; i < serverdata.max_player; i++) {
        if (pdata.getpinfo(i) != undefined) {
            play = alt.Player.getByID(i);
            if (pdata.getData(i, "pAdmin") >= 1) {
                chat.send(play, `{DDCC00}AdminWarn: {fcb212}${adminname} : {DAF7A6}${msg}`);
            }
        }
    }
}
export function founderchat(adminname, msg) {
    let play;
    for (let i = 0; i < serverdata.max_player; i++) {
        if (pdata.getpinfo(i) != undefined) {
            if (pdata.getData(i, "pAdmin") >= 6) {
                play = alt.Player.getByID(i);
                chat.send(play, `{ec1313}FounderChat -> {fcb212}${adminname} : {ffffff}${msg}`);
            }
        }
    }
}


alt.on('serverlog', (type, args) => {
    if (type == 'error') {
        console.log('\x1B[31m', args, '\x1B[37m');
    } else if (type == 'success') {
        console.log('\x1B[32m', args, '\x1B[37m');
    } else if (type == 'warn') {
        console.log('\x1B[33m', args, '\x1B[37m');
    }
});

export function getplayerid(id) {
    return Ids[id];
};

export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


export function setplayermodel(playerid, model) {
    let vgid = getplayerid(playerid);
    if (vgid != undefined) {
        alt.Player.getByID(vgid).model = model;
    }
};

export function spawnplayer(id) {
    if (pdata.getData(id, "pHouse") == 0) {
        let p = alt.Player.getByID(id);
        p.spawn(-1039.84619140625, -2741.248291015625, 13.879150390625);
        p.model = 'mp_m_freemode_01';
    } else {
        console.log("house dare");
    }
};

export function setplayerid(playerid) {
    for (let i = 1; i < serverdata.max_player; i++) {
        if (Ids[i] == undefined) {
            Ids[i] = playerid;
            return i;
        }
    }
};

export function deleteplayerid(playerid) {
    for (let i = 1; i < serverdata.max_player; i++) {
        if (Ids[i] == playerid) {
            Ids[i] = undefined;
            break;
        }
    }
}

export function hourtoms(hour) {
    let time = (hour * (60 * 60)) * 1000;
    return time;
}

export default { getplayerid, setplayerid, setplayermodel, spawnplayer, sleep, adminchat, deleteplayerid, founderchat };