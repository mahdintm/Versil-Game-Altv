import * as alt from 'alt';
import SQL from '../db/database.mjs';
import { Vehicles } from '../db/entities/data.mjs';
var db = new SQL('mysql', '127.0.0.1', 3306, 'root', '', 'alt', [Vehicles]);

var vehicles = {}

alt.on('anyResourceStart', (name) => {
    if (name == "vehicledata") {
        for (let i = 1; i < 1000; i++) {
            db.fetchAllByField('id', i, Vehicles, data => {
                // if (data[0] != undefined) {
                //     data.find(dveh => {
                //         const newveh = new alt.Vehicle(dveh.model, dveh.x, dveh.y, dveh.z, 0, 0, 0);
                //         vehicles[newveh.id] = data[0];
                //     })
                // }
            });
        }
    }
})