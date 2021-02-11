import * as alt from 'alt';
import pdata from 'playerdata';
import chat from 'chat';
//for check admini level
function checkadmin(player, admin) {
    if ((pdata.getData(player.id, 'pAdmin')) >= admin) {
        return true;
    }
}

function notadmin(player) {
    chat.send(player, `Versil BOT ->{ff0000}You are not admin.`)
}

function veh(player, args) {
    if (checkadmin(player, 2)) {
        const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
        const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
        alt.emitClient(player, 'setIntoVehicle', newveh);
    } else {
        notadmin(player)
    }
};

chat.registerCmd('vehicle', veh);
chat.registerCmd('veh', veh);