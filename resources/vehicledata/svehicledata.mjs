import * as alt from 'alt';
import SQL from '../db/database.mjs';
import { Vehicles } from '../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'root', '', 'alt', [Vehicles]);

var vehicles = {}

alt.on('anyResourceStart', (name) => {
    if (name == "vehicledata") {
        alt.setTimeout(() => {
            for (let i = 1; i < 1000; i++) {
                db.fetchAllByField('id', i, 'vehicles', data => {
                    if (data[0] != undefined) {
                        data.find(dveh => {
                            const newveh = new alt.Vehicle(dveh.model, dveh.x, dveh.y, dveh.z, 0, 0, 0);
                            vehicles[newveh.id] = data[0];
                        })
                    }
                });
            }
        }, 1000);
    }
})

export function vehiclesetdata(id, model, type, factionid, x, y, z, rx, ry, rz, plate) {

    vehicles[id]["id"] = id;
    vehicles[id]["model"] = model;
    vehicles[id]["type"] = type;
    vehicles[is]["factionid"] = factionid;
    vehicles[id]["x"] = x;
    vehicles[id]["y"] = y;
    vehicles[id]["z"] = z;
    vehicles[id]["rx"] = rx;
    vehicles[id]["ry"] = ry;
    vehicles[id]["rz"] = rz;
    vehicles[id]["plate"] = plate;

}

export default (vehiclesetdata);