import * as alt from 'alt';
var sb = {};

export function addrow(id, playerid, name, ping) {
    console.log("Serverside : ", id, " ", playerid, " ", name, " ", ping)
    sb[playerid] = { "id": id, "name": name, "ping": ping }
    alt.emitClient(null, 'addrow', id, name, ping)
}

setInterval(function() {
    for (let i = 1; i < 1000; i++) {
        if (getplayer)
    }
}, 1000);

export function deleterow(playerid) {
    //sb[playerid] = undefined;
    //ali.emitClient(null, 'delete', (id));
}



export default { addrow };