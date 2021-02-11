import * as alt from 'alt';
import pdata from 'playerdata';
import chat from 'chat';
var Ids = {};

export function adminchat(player, msg) {
    let play;
    let name;
    for (let i = 1; i < 1000; i++) {
        if (getplayerid(i) != undefined) {
            play = alt.Player.getByID(getplayerid(i));
            name = pdata.getData(play.id, "pName");
            if (pdata.getData(play.id, "pAdmin") > 1) {
                chat.send(play, `{BBDE42}AdminChat -> ${name} : ${msg}`);
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
        p.spawn(-1008.672546, 23.868131, 50.3084716);
        p.model = 'mp_m_freemode_01';
    } else {
        console.log("house dare");
    }
};

export function setplayerid(playerid) {
    for (let i = 1; i < 1000; i++) {
        if (Ids[i] == undefined) {
            Ids[i] = playerid;
            break;
        }
    }
};

export function deleteplayerid(playerid) {
    for (let i = 1; i < 1000; i++) {
        if (Ids[i] == playerid) {
            Ids[i] = undefined;
            break;
        }
    }
}

export default { getplayerid, setplayerid, setplayermodel, spawnplayer, sleep, adminchat, deleteplayerid };