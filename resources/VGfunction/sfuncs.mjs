import * as alt from 'alt';
import pdata from 'playerdata';
var Ids = {};

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
        p.spawn(-2639.872, 1866.812, 160.135, 0.1);
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

export default { getplayerid, setplayerid, setplayermodel, spawnplayer };