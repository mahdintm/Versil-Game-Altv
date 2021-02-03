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
})

export function getplayerid(id) {
    return Ids[id];
}

export function VGsetplayerid(playerid) {
    for (let i = 1; i < 1000; i++) {
        if (Ids[i] == undefined) {
            Ids[i] = playerid;
            break;
        } else {
            console.log("naiomadam");
        }
    }
};

export default { getplayerid, VGsetplayerid };