import * as alt from 'alt';
import pdata from 'playerdata';
import chat from 'chat';
import vdata from 'vehicledata';
import vg from 'VGfunction';
import SQL from '../../db/database.mjs';
import { Vehicles } from '../../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Vehicles]);
//------------------------------------------------------------ Functions ------------------------------------------------------------//
//for check admini level
function checkadmin(player, admin) {
    if ((pdata.getData(player.id, 'pAdmin')) >= admin) {
        return true;
    }
}
//for check admin > 1
function areadmin(player) {
    if ((pdata.getData(player.id, 'pAdmin')) >= 1) {
        return true;
    }
}
//for find player by id or name or partial name
function findplayer(value) {
    if (!isNaN(value)) {
        console.log("avali");
        return alt.Player.getByID(vg.getplayerid(i));
    } else {
        console.log("avali");
        return (pdata.findbyname(value));
    }
}
//for send message youare not admin
// pLand baraye zaban hast age 1 bashe yani english 2 bashe fenglish 3 bashe farsi
function notadmin(player) {
    if (pdata.getData(player.id, "pLang") == 1) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}You are not admin.`);
    } else if (pdata.getData(player.id, "pLang") == 2) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}Shoma admin nistid.`);
    } else if (pdata.getData(player.id, "pLang") == 3) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}شما ادمین نیستید.`);
    }
}
//for send message dastresi nadari
function auth(player) {
    if (pdata.getData(player.id, "pLang") == 1) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}You are permission not enough fot this access.`);
    } else if (pdata.getData(player.id, "pLang") == 2) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}Shoma  be in faaliat dastresi kafi nadarid.`);
    } else if (pdata.getData(player.id, "pLang") == 3) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}شما دسترسی کافی برای انجام این کار را ندارید.`);
    }
}
//for error args
function errorargs(player, msg) {
    if (pdata.getData(player.id, "pLang") == 1) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}Error: ${msg}`);
    } else if (pdata.getData(player.id, "pLang") == 2) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}Khata: ${msg}`);
    } else if (pdata.getData(player.id, "pLang") == 3) {
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}خطا: ${msg}`);
    }
}

//------------------------------------------------------------ CMD Functions ------------------------------------------------------------//
//for cmd create vehicle
function veh(player, args) {
    if (checkadmin(player, 2)) {
        const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
        const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
        console.log(newveh.model);
        console.log(newveh.id);
        newveh.numberPlateText = `AV ${newveh.id}`;
        alt.emitClient(player, 'setIntoVehicle', newveh);
        if (pdata.getData(player.id, "pLang") == 1) {
            chat.send(player, `{ff0000}Versil BOT -> {05ff48}You'vehicle has been spawned ✔`);
        } else if (pdata.getData(player.id, "pLang") == 2) {
            chat.send(player, `{ff0000}Versil BOT -> {05ff48}mashin shoma ba movafaghiyat spawn shod ✔`);
        } else if (pdata.getData(player.id, "pLang") == 3) {
            chat.send(player, `{ff0000}Versil BOT -> {05ff48}ماشین شما اسپان شد ✔ `);
        }
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
//for cmd make admin
function makeadmin(player, args) {
    if (areadminmin(player)) {
        if (checkadmin(player, 15)) {
            if (args[0] == undefined && args[1] == undefined) {

            } else {
                let msg = "/makeadmin(ma) [Playername/Playerid] [AdminLevel]"
                errorargs(player, msg)
            }
        } else {
            notadmin(player)
        }
    } else {
        auth(player)
    }
}
//for cmd create static vehicle
function crvehicle(player, args) {
    if (checkadmin(player, 2)) {
        if (args[0] != undefined) {
            const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
            const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
            alt.emitClient(player, 'setIntoVehicle', newveh);
            let pl = vdata.getplatenumstatic();
            let plate = `AV ${pl}`;
            vdata.addplatenumstatic();
            newveh.numberPlateText = plate;
            vdata.vehiclesetdata(newveh.id, args[0], "static", 0, pos.x, pos.y, pos.z, 0, 0, 0, plate);
            db.upsertData({ model: args[0].toLowerCase(), type: "static", factionid: 0, x: pos.x, y: pos.y, z: pos.z, rx: 0, ry: 0, rz: 0 }, 'vehicles', res => { });
        } else {
            chat.send(player, "{ff0000}Versil BOT -> {ff0000}Error: /crsvehicle(csv) [Model]");
        }
    } else {
        notadmin(player)
    }
}

//for cmd create faction vehicle
function crvehiclef(player, args) {
    if (checkadmin(player, 2)) {
        if (args[0] != undefined && args[1] != undefined) {
            const pos = { x: player.pos.x, y: player.pos.y, z: player.pos.z }
            const newveh = new alt.Vehicle(args[0], pos.x, pos.y, pos.z, 0, 0, 0);
            alt.emitClient(player, 'setIntoVehicle', newveh);
            if (args[1] == 1) {
                let pl = vdata.getplatenumfaction(args[1]);
                var plate = `PD ${pl}`;
                vdata.addplatenumstatic(args[1]);
            } else if (args[1] == 2) {
                let pl = vdata.getplatenumfaction(args[1]);
                var plate = `FBI ${pl}`;
                vdata.addplatenumstatic(args[1]);
            } else if (args[1] == 3) {
                let pl = vdata.getplatenumfaction(args[1]);
                var plate = `NG ${pl}`;
                vdata.addplatenumstatic(args[1]);
            } else if (args[1] == 4) {
                let pl = vdata.getplatenumfaction(args[1]);
                var plate = `Taxi ${pl}`;
                vdata.addplatenumstatic(args[1]);
            }
            newveh.numberPlateText = plate;
            vdata.vehiclesetdata(newveh.id, args[0], "faction", args[1], pos.x, pos.y, pos.z, 0, 0, 0, plate);
            db.upsertData({ model: args[0].toLowerCase(), type: "faction", factionid: args[1], x: pos.x, y: pos.y, z: pos.z, rx: 0, ry: 0, rz: 0 }, 'vehicles', res => { });
        } else {
            chat.send(player, "{ff0000}Versil BOT -> {ff0000}Error: /crfvehicle(cfv) [Model] [Faction-ID]");
        }
    } else {
        notadmin(player)
    }
}
//for CMD give gun
//givegun playerid weaponneme ammo
function givegun(player, args) {
    if (areadminmin(player)) {
        if (checkadmin(player, 15)) {
            if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
                alt.Player.getByID(vg.getplayerid(args[0])).giveWeapon(args[1], args[2], true);
                chat.send(player, `{ff0000}Versil BOT -> {05ff48}You are weapon has been added ✔`);
            } else if (pdata.getData(player.id, "pLang") == 2) {
                chat.send(player, `{ff0000}Versil BOT -> {05ff48}aslahe shoma ezafe shod✔`);
            } else if (pdata.getData(player.id, "pLang") == 3) {
                chat.send(player, `{ff0000}Versil BOT -> {05ff48}اسلحه شما اضافه شد ✔ `);
            } else {
                let msg = "/givegun [Playername/Playerid] [weaponname] [ammo]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)

    }
}
//for CMD kick
//kickplayer playerid respone
function kick(player, args) {
    if (areadminmin(player)) {
        if (checkadmin(player, 15)) {
            if (args[0] != undefined && args[1] != undefined) {
                alt.Player.getByID(vg.getplayerid(args[0])).kick(args[1]...);
                alt.setTimeout(() => {
                    console.log(`${alt.Player.getByID(vg.getplayerid(args[0])).name} will be kicked in 5 seconds.`);
                }, 2000);
            } else {
                let msg = "/kick [Playerid] [respone]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)

    }
}
chat.registerCmd('sethp', hp)
chat.registerCmd('vehicle', veh);
chat.registerCmd('veh', veh);
chat.registerCmd('mypos', mypos);
chat.registerCmd('crsvehicle', crvehicle);
chat.registerCmd('csv', crvehicle);
chat.registerCmd('crfvehicle', crvehiclef);
chat.registerCmd('cfv', crvehiclef);
chat.registerCmd('makeadmin', makeadmin);
chat.registerCmd('ma', crvehiclef);
chat.registerCmd('kick', kick);
chat.registerCmd('givegun', givegun);

chat.registerCmd('aaaa', (player, args) => {
    console.log(findplayer(args[0]))
})

// chat.registerCmd('dv', (player, args) => {
//     let id = alt.Vehicle.getByID(args[0]);
//     id.destroy();
// })


// alt.on('playerEnteringVehicle', (player, vehicle, seat) => {
//     console.log(vehicle.pos.rx);
// })