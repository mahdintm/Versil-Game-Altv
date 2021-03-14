import * as alt from 'alt';
import vg from 'VGfunction';
var sb = {};

export function addrow(id, playerid, name, ping) {
    sb[playerid] = { "id": id, "idalt": playerid, "name": name, "ping": ping }
    alt.emitClient(null, 'addrow', id, name, ping)
}

setInterval(function() {
    for (let i = 1; i < 1000; i++) {
        if (vg.getplayerid(i) != undefined) {
            alt.emitClient(null, "updatepingsc", i, alt.Player.getByID(vg.getplayerid(i)).ping)
        }
    }
}, 500);

setInterval(function() {
    for (let i = 1; i < 1000; i++) {
        if (sb[i] != undefined) {
            alt.emitClient(null, "updaterowsc", sb[i]["id"], sb[i]["name"], sb[i]["ping"])
        }
    }
}, 2000);

export function deleterow(playerid) {
    for (let i = 1; i < 1000; i++) {
        if (sb[i] != undefined) {
            if (sb[i]["id"] == playerid) {
                alt.emitClient(null, 'deleterowcsc', (i));
            }
        }
    }
}



export default { addrow, deleterow };