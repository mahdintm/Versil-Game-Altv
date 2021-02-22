import * as alt from 'alt';
import { getplayerid } from '../VGfunction/sfuncs.mjs';
var sb = {};

export function addrow(id, playerid, name, ping) {
    console.log("Serverside : ", id, " ", playerid, " ", name, " ", ping)
    sb[playerid] = { "id": id, "name": name, "ping": ping }
    alt.emitClient(null, 'addrow', id, name, ping)
}
let a = 1
while (a == 2) {
    for (let i = 1; i < 1000; i++) {
        if (getplayerid(i) != undefined) {
            alt.emitClient(null, "updatepingsc", alt.Player.getByID(getplayerid(i)).ping)
        }
    }
}

export function deleterow(playerid) {
    //sb[playerid] = undefined;
    //ali.emitClient(null, 'delete', (id));
}



export default { addrow };