import * as alt from 'alt';
import pdata from 'playerdata';
import chat from 'chat';
import vdata from 'vehicledata';

//for check admini level
function checkadmin(player, admin) {
    if ((pdata.getData(player.id, 'pAdmin')) >= admin) {
        return true;
    }
}
//for send message youare not admin
function notadmin(player) {
    chat.send(player, `{ff0000}Versil BOT -> {d8db0d}You are not admin.`);
}
//for cmd create vehicle
function veh(player, args) {
    if (checkadmin(player, 2)) {
        const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
        const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
        console.log(newveh.model);
        console.log(newveh.id);
        newveh.numberPlateText("admin veh");
        alt.emitClient(player, 'setIntoVehicle', newveh);
    } else {
        notadmin(player);
    }
};
//for cmd sethp
function hp(player, args) {
    if (checkadmin(player, 2)) {
        const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
        const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
        alt.emitClient(player, 'setIntoVehicle', newveh);
    } else {
        notadmin(player)
    }
}
//for cmd see my pos
function mypos(player) {
    if (checkadmin(player, 2)) {
        return chat.send(player, `X: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);
    } else {
        notadmin(player)
    }
}
//for cmd create static vehicle
// function crvehicle(player, args) {
//     if (checkadmin(player, 2)) {
//         const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
//         const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
//         alt.emitClient(player, 'setIntoVehicle', newveh);

//         //function vehiclesetdata(id, model, type, factionid, x, y, z, rx, ry, rz, plate) {
//         vdata.vehiclesetdata(newveh.id, args[0], static, 0, pos.x, pos.y, pos.z, 0, 0, 0, plate);
//     } else {
//         notadmin(player)
//     }
// }


chat.registerCmd('sethp', hp)
chat.registerCmd('vehicle', veh);
chat.registerCmd('veh', veh);
chat.registerCmd('mypos', mypos);
// chat.registerCmd('createstaticvehicle', crvehicle);
// chat.registerCmd('csv', crvehicle);




// chat.registerCmd('dv', (player, args) => {
//     let id = alt.Vehicle.getByID(args[0]);
//     id.destroy();
// })


// alt.on('playerEnteringVehicle', (player, vehicle, seat) => {
//     console.log(vehicle.pos.rx);
// })