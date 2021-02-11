import * as alt from 'alt';
import pdata from 'playerdata';
import chat from 'chat';
//for check admini level
function checkadmin(player, admin) {
    if ((pdata.getData(player.id, 'pAdmin')) >= admin) {
        return true;
    }
}

function veh(player, args) {
    if (checkadmin(player, 2)) {
        const newveh = new alt.Vehicle(args[0], -2639.872, 1866.812, 160.135, 0, 0, 0);
        alt.emitClient(player, 'vehicle:SetInto', newveh);
    } else {
        console.log("you are not admin");
    }
};
chat.registerCmd('veh', veh);