import * as alt from 'alt';
import SQL from '../db/database.mjs';
import { Vehicles } from '../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', '5507d1a19a63c54e4ab4a07cf718ce20', 'alt', [Vehicles]);

var vehicles = {}
var staticveh = 1;
var factionveh = 1;
var pdveh = 1;
var fbiveh = 1;
var ngveh = 1;
var eventveh = 1;
var plate;

alt.on('anyResourceStart', (name) => {
    if (name == "vehicledata") {
        alt.setTimeout(() => {
            for (let i = 1; i < 1000; i++) {
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
                            }
                        })
                    }
                });
            }
        }, 1000);
    }
})

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



export default { vehiclesetdata, getplatenumstatic, addplatenumstatic, getplatenumfaction, addplatenumfaction };