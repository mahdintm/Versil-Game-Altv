import * as alt from 'alt';
import pdata from 'playerdata';
import SQL from '../db/database.mjs';
import mysqldata from '../db/config.json';
import serverdata from '../db/config.json';
import { Vehicles } from '../db/entities/data.mjs';
const db = new SQL('mysql', mysqldata.host_mysql, mysqldata.port_mysql, mysqldata.user_mysql, mysqldata.pass_mysql, mysqldata.db_mysql, [Vehicles]);

var maxveh = serverdata.max_vehicle;
var vehicles = {}
var pveh = {}
var staticveh = 1;
var factionveh = 1;
var pdveh = 1;
var fbiveh = 1;
var ngveh = 1;
var eventveh = 1;
var personalveh = 1;
var loadedpersonalveh = 0;
var plate;

alt.on('anyResourceStart', (name) => {
    if (name == "vehicledata") {
        alt.setTimeout(() => {
            for (let i = 1; i < maxveh; i++) {
                db.fetchAllByField('id', i, 'vehicles', data => {
                    if (data[0] != undefined) {
                        data.find(dveh => {
                            if (dveh.type == "static") {
                                const newveh = new alt.Vehicle(dveh.model, dveh.x, dveh.y, dveh.z, dveh.rx, dveh.ry, dveh.rz);
                                vehicles[newveh.id] = data[0];
                                plate = `ST ${staticveh}`;
                                newveh.numberPlateText = plate;
                                vehicles[newveh.id]["plate"] = plate;
                                staticveh++;
                            } else if (dveh.type == "faction") {
                                if (dveh.factionid == 1) {
                                    const newveh = new alt.Vehicle(dveh.model, dveh.x, dveh.y, dveh.z, dveh.rx, dveh.ry, dveh.rz);
                                    vehicles[newveh.id] = data[0];
                                    plate = `PD ${pdveh}`;
                                    newveh.numberPlateText = plate;
                                    vehicles[newveh.id]["plate"] = plate;
                                    factionveh++;
                                    pdveh++;

                                } else if (dveh.factionid == 2) {
                                    const newveh = new alt.Vehicle(dveh.model, dveh.x, dveh.y, dveh.z, dveh.rx, dveh.ry, dveh.rz);
                                    vehicles[newveh.id] = data[0];
                                    plate = `FBI ${fbiveh}`;
                                    newveh.numberPlateText = plate;
                                    vehicles[newveh.id]["plate"] = plate;
                                    factionveh++;
                                    fbiveh++;
                                } else if (dveh.factionid == 3) {
                                    const newveh = new alt.Vehicle(dveh.model, dveh.x, dveh.y, dveh.z, dveh.rx, dveh.ry, dveh.rz);
                                    vehicles[newveh.id] = data[0];
                                    plate = `NG ${ngveh}`;
                                    newveh.numberPlateText = plate;
                                    vehicles[newveh.id]["plate"] = plate;
                                    factionveh++;
                                    ngveh++;
                                }
                            } else if (dveh.type == "personal") {
                                pveh[personalveh] = data[0];
                                personalveh++;
                            }
                        })
                    }
                });
            }
        }, 1000);
    }
})

export function loadpersonalveh(player) {
    for (let i = 1; i < maxveh; i++) {
        if (pveh[i] != undefined) {
            if (pveh[i]["owner"] == pdata.getData(player.id, "pId")) {
                const newpveh = new alt.Vehicle(pveh[i]["model"], pveh[i]["x"], pveh[i]["y"], pveh[i]["z"], pveh[i]["rx"], pveh[i]["ry"], pveh[i]["rz"]);
                vehicles[newpveh.id] = pveh[i];
                plate = pveh[i]["plate"];
                newpveh.numberPlateText = plate;
                loadedpersonalveh++;
            }
        }
    }
}

export function deletepersonalveh(player) {
    for (let i = 1; i < maxveh; i++) {
        if (vehicles[i] != undefined) {
            if (vehicles[i]["owner"] == pdata.getData(player.id, "pId")) {
                var vehicle = alt.Vehicle.getByID(parseInt(i));
                if (vehicle) vehicle.destroy();
                loadedpersonalveh--;
            }
        }
    }
}

export function updateposveh(id, xv, yv, zv, rxv, ryv, rzv) {
    db.updatePartialData(vehicles[id]["id"], { x: xv, y: yv, z: zv, rx: rxv, ry: ryv, rz: rzv }, Vehicles, res => {})
}

export function vehiclesetdata(id, model, type, factionid, x, y, z, rx, ry, rz, plate) {
    vehicles[id] = {};
    vehicles[id]["id"] = id;
    vehicles[id]["model"] = model;
    vehicles[id]["type"] = type;
    vehicles[id]["factionid"] = factionid;
    vehicles[id]["x"] = x;
    vehicles[id]["y"] = y;
    vehicles[id]["z"] = z;
    vehicles[id]["rx"] = rx;
    vehicles[id]["ry"] = ry;
    vehicles[id]["rz"] = rz;
    vehicles[id]["plate"] = plate;

}

export function getplatenumstatic() {
    return staticveh;
}
export function addplatenumstatic() {
    staticveh++;
}
export function getplatenumfaction(id) {

    if (id == 0) {
        return factionveh;
    } else if (id == 1) {
        return pdveh;
    } else if (id == 2) {
        return fbiveh;
    } else if (id == 3) {
        return ngveh;
    } else if (id == 4) {
        return taxiveh;
    }

}
export function addplatenumfaction(id) {
    if (id == 0) {
        factionveh++;
    } else if (id == 1) {
        pdveh++;
    } else if (id == 2) {
        fbiveh++;
    } else if (id == 3) {
        ngveh++;
    } else if (id == 4) {
        taxiveh++;
    }
}

alt.on('playerEnteringVehicle', (player, vehicle, seat) => {
    if (vehicles[vehicle.id]["factionid"] == 1) {
        if (pdata.getData(player.id, "pLeader") != 1) {
            if (seat == 1) {
                alt.emitClient(player, 'exitfromvehicle', vehicle, 1)
                console.log('You are not Cop');
            } else if (!vehicle.driver) {
                alt.emitClient(player, 'exitfromvehicle', vehicle, 1)
                console.log('You are not Cop');
            }
        } else {
            if (pdata.getData(player.id, "pFactionrank") >= vehicles[vehicle.id]["factionrank"]) {
                alt.emitClient(player, 'exitfromvehicle', vehicle, 1)
                console.log('shoma nemituni savar shi  1');
            }
        }
    } else if (vehicles[vehicle.id]["factionid"] == 2) {
        console.log("fbi")
        if (pdata.getData(player.id, "pLeader") != 2) {
            alt.emitClient(player, 'exitfromvehicle', vehicle, 1)
            console.log('shoma nemituni savar shi  2 ');
        }
    }

})


export default { vehiclesetdata, getplatenumstatic, addplatenumstatic, getplatenumfaction, updateposveh, addplatenumfaction, loadpersonalveh, deletepersonalveh };