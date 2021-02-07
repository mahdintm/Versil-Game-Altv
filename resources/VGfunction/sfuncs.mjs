import * as alt from 'alt';
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

export function setplayermodel(playerid, model) {
    let vgid = getplayerid(playerid);
    if (vgid != undefined) {
        alt.Player.getByID(vgid).model = model;
    }
};
export function spawnplayer(id) {
    if (pdata.getData(id, "pHouse") == 0) {
        let p = alt.Player.getByID(id);
        p.getByID(id).spawn(-2639.872, 1866.812, 160.135, 0.1);
        p.getByID(getplayerid(playerid)).model = pdata.getData(id, "pSkin");
    } else {
        console.log("house dare");
    }
};

export function VGsetplayerid(playerid) {
    for (let i = 1; i < 1000; i++) {
        if (Ids[i] == undefined) {
            Ids[i] = playerid;
            break;
        }
    }
};

export default { getplayerid, VGsetplayerid, setplayermodel };