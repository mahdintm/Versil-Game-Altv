import * as alt from 'alt';
import chat from 'chat';
import vg from 'VGfunction';
import SQL from '../db/database.mjs';
import { Account } from '../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
alt.on('serverlogin', (user, pass) => {
    db.fetchAllByField('pName', args[0], 'Account', data => {
        // let a = Array.find();const player = alt.Player.getByID(your id here); 

        pInfo[0] = data[0];
    });
});