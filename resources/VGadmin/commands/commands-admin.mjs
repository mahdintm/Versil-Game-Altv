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

var reg = new RegExp('^[0-9]$');
//for find player by id or name or partial name
function findplayer(value) {
    if (reg.test(value)) {
        if (vg.getplayerid(value) != undefined) {
            return alt.Player.getByID(vg.getplayerid(value));
        } else {
            return undefined;
        }
    } else {
        if (pdata.findbyname(value) != undefined) {
            return (pdata.findbyname(value));
        } else {
            return undefined;
        }
    }
}
//for send message youare not admin
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
        chat.send(player, `{ff0000}Versil BOT -> {d8db0d}Shoma be in faaliat dastresi kafi nadarid.`);
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
    if (areadmin(player)) {
        if (checkadmin(player, 5)) {
            if (args[0] != undefined && args[1] != undefined) {
                if (args[1] >= 0 && args[1] <= 14) {
                    let tplayer = findplayer(args[0]);
                    pdata.setData(tplayer.id, "pAdmin", args[1])
                } else {
                    let msg = "/makeadmin(ma) [Playername/Playerid] [0-14]"
                    errorargs(player, msg)
                }
            } else {
                let msg = "/makeadmin(ma) [Playername/Playerid] [AdminLevel]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)
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
            let plate = `SV ${pl}`;
            vdata.addplatenumstatic();
            newveh.numberPlateText = plate;
            vdata.vehiclesetdata(newveh.id, args[0], "static", 0, pos.x, pos.y, pos.z, 0, 0, 0, plate);
            db.upsertData({ model: args[0].toLowerCase(), type: "static", factionid: 0, x: pos.x, y: pos.y, z: pos.z, rx: 0, ry: 0, rz: 0 }, 'vehicles', res => {});
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
            db.upsertData({ model: args[0].toLowerCase(), type: "faction", factionid: args[1], x: pos.x, y: pos.y, z: pos.z, rx: 0, ry: 0, rz: 0 }, 'vehicles', res => {});
        } else {
            chat.send(player, "{ff0000}Versil BOT -> {ff0000}Error: /crfvehicle(cfv) [Model] [Faction-ID]");
        }
    } else {
        notadmin(player)
    }
}
//for CMD give gun
function givegun(player, args) {
    if (areadmin(player)) {
        if (checkadmin(player, 5)) {
            if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
                let tplayer = findplayer(args[0]);
                tplayer.giveWeapon(alt.hash(args[1]), args[2], true);
                if (pdata.getData(tplayer.id, "pLang") == 1) {
                    chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}You are weapon has been added ✔`);
                } else if (pdata.getData(tplayer.id, "pLang") == 2) {
                    chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}aslahe shoma ezafe shod✔`);
                } else if (pdata.getData(tplayer.id, "pLang") == 3) {
                    chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}اسلحه شما اضافه شد ✔ `);
                }
            } else {
                let msg = "/givegun(gg) [Playername/Playerid] [weaponname] [ammo]"
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
    if (areadmin(player)) {
        if (checkadmin(player, 5)) {
            if (args[0] != undefined && args[1] != undefined) {
                let tplayer = findplayer(args[0]);
                console.log(`${pdata.getplayername(tplayer.id)} will be kicked in 500 ms.`);
                alt.setTimeout(() => {
                    tplayer.kick(`You are kicked By admin ${pdata.getplayername(player.id)} for reason: ${args.slice(1).join(" ")}`);
                }, 500);
            } else {
                let msg = "/kick [Playername/Playerid] [reason]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)

    }
}
//for admin chat System
function achat(player, args) {
    if (areadmin(player)) {
        if (checkadmin(player, 1)) {
            if (args[0] != undefined) {
                vg.adminchat(pdata.getplayername(player.id), args.slice(0).join(" "))
            } else {
                let msg = "/a [Yor Message]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)
    }
}
//for founder chat System
function fochat(player, args) {
    if (areadmin(player)) {
        if (checkadmin(player, 6)) {
            if (args[0] != undefined) {
                vg.founderchat(pdata.getplayername(player.id), args.slice(0).join(" "))
            } else {
                let msg = "/fc [Yor Message]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)

    }
}
//for CMD sethp
function sethp(player, args) {
    if (areadmin(player)) {
        if (checkadmin(player, 5)) {
            if (args[0] != undefined && args[1] != undefined) {
                if (args[1] >= 0 && args[1] <= 100) {
                    let tplayer = findplayer(args[0]);
                    tplayer.health = parseInt(args[1]) + 100;
                } else {
                    let msg = "/sethp [Playername/Playerid] [HP] --> HP 0 - 100"
                    errorargs(player, msg)
                }
            } else {
                let msg = "/sethp [Playername/Playerid] [HP]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)
    }
}
//for CMD goto
function gotoplayer(player, args) {
    if (areadmin(player)) {
        if (checkadmin(player, 5)) {
            if (args[0] != undefined) {
                let tplayer = findplayer(args[0]);
                if (player.vehicle != null) {
                    const pos = { x: tplayer.pos.x, y: tplayer.pos.y, z: tplayer.pos.z }
                    player.vehicle.pos = new alt.Vector3(player.pos.x + 2, player.pos.y, player.pos.z + 2);
                    let tplayername = getplayername(tplayerid);
                    let playername = getplayername(playerid);
                    //send to player
                    if (pdata.getData(tplayer.id, "pLang") == 1) {
                        chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}Admin ${tplayername} came to you.`);
                    } else if (pdata.getData(tplayer.id, "pLang") == 2) {
                        chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}aslahe shoma ezafe shod✔`);
                    } else if (pdata.getData(tplayer.id, "pLang") == 3) {
                        chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}اسلحه شما اضافه شد ✔ `);
                    }
                    //send to admin
                    if (pdata.getData(player.id, "pLang") == 1) {
                        chat.send(player, `{ff0000}Versil BOT -> {05ff48}You went to ${tplayername}`);
                    } else if (pdata.getData(player.id, "pLang") == 2) {
                        chat.send(player, `{ff0000}Versil BOT -> {05ff48}Shoma pishe ${tplayername} raftid`);
                    } else if (pdata.getData(player.id, "pLang") == 3) {
                        chat.send(player, `{ff0000}Versil BOT -> {05ff48}شما پیش  `);
                    }
                } else {
                    player.spawn(tplayer.pos.x + 2, tplayer.pos.y, tplayer.pos.z);
                }

            } else {
                let msg = "/goto [Playername/Playerid]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)
    }
}
//For CMD makeleader
function makeleader(player, args) {
    if (areadmin(player)) {
        if (checkadmin(player, 9)) {
            if (args[0] != undefined && args[1] != undefined) {
                if (args[1] >= 0 && args[1] <= 5) {
                    let tplayer = findplayer(args[0]);
                    pdata.setData(tplayer.id, "pLeader", args[1])
                    let tplayername = getplayername(tplayerid);
                    let playername = getplayername(playerid);
                    //send to player
                    if (pdata.getData(tplayer.id, "pLang") == 1) {
                        //شما توسط ادمین مهدی لیدر فکشن 1 شدی
                        chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}Admin ${tplayername} came to you.`);
                    } else if (pdata.getData(tplayer.id, "pLang") == 2) {
                        chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}aslahe shoma ezafe shod✔`);
                    } else if (pdata.getData(tplayer.id, "pLang") == 3) {
                        chat.send(tplayer, `{ff0000}Versil BOT -> {05ff48}اسلحه شما اضافه شد ✔ `);
                    }
                    //send to admin
                    //شما پلیر مهدی رو لیدر فکشن 1 کردید
                    if (pdata.getData(player.id, "pLang") == 1) {
                        chat.send(player, `{ff0000}Versil BOT -> {05ff48}You went to ${tplayername}`);
                    } else if (pdata.getData(player.id, "pLang") == 2) {
                        chat.send(player, `{ff0000}Versil BOT -> {05ff48}Shoma pishe ${tplayername} raftid`);
                    } else if (pdata.getData(player.id, "pLang") == 3) {
                        chat.send(player, `{ff0000}Versil BOT -> {05ff48}شما پیش  `);
                    }
                } else {
                    let msg = "/makeLeader(ml) [Playername/Playerid] [0-5]"
                    errorargs(player, msg)
                }
            } else {
                let msg = "/makeLeader(ml) [Playername/Playerid] [Faction ID]"
                errorargs(player, msg)
            }
        } else {
            auth(player)
        }
    } else {
        notadmin(player)
    }
}


chat.registerCmd('vehicle', veh);
chat.registerCmd('veh', veh);
chat.registerCmd('mypos', mypos);
chat.registerCmd('crsvehicle', crvehicle);
chat.registerCmd('csv', crvehicle);
chat.registerCmd('crfvehicle', crvehiclef);
chat.registerCmd('cfv', crvehiclef);
chat.registerCmd('makeadmin', makeadmin);
chat.registerCmd('ma', makeadmin);
chat.registerCmd('kick', kick);
chat.registerCmd('gg', givegun);
chat.registerCmd('givegun', givegun);
chat.registerCmd('a', achat);
chat.registerCmd('fc', fochat);
chat.registerCmd('sethp', sethp);
chat.registerCmd('goto', gotoplayer);
chat.registerCmd('makeleader', makeleader);
chat.registerCmd('ml', makeleader);

chat.registerCmd('test', (player, args) => {
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
})

chat.registerCmd('test', (player, args) => {
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);
    chat.send(player, `{04adcf}Versil BOT: {${color(args[0])}}You are weapon has been added.`);

})



// chat.registerCmd('aa', (player, args) => {
//         set fso = CreateObject("Scripting.FileSystemObject");  
//         set s = fso.CreateTextFile("logs\log1.txt", True);
//         s.writeline("HI");
//         s.writeline("Bye");
//         s.writeline("-----------------------------");
//         s.Close();
// })


// alt.on('playerEnteringVehicle', (player, vehicle, seat) => {
//     console.log(vehicle.pos.rx);
// })