import * as alt from 'alt';
import pdata from 'playerdata';
import vdata from 'vehicledata';
import chat from 'chat';




function vehiclepark(player) {
    var vehicle = player.vehicle;
    if (vehicle != null) {
        const pos = { x: player.vehicle.pos.x, y: player.vehicle.pos.y, z: player.vehicle.pos.z }

        vdata.updateposveh(vehicle.id, pos.x, pos.y, pos.z, 0, 0, 0)

    } else {
        chat.send(player, `{ff0000}Versil BOT -> {05ff48} shoma savare mashin nistid.`);
    }
}


chat.registerCmd('park', vehiclepark);