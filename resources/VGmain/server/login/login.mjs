import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import pdata from 'playerdata';
import SQL from '../../../db/database.mjs';
import { Account } from '../../../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
alt.onClient('serverlogin', (user, pass) => {
    console.log("mano seda kari?");
    db.fetchAllByField('pName', args[0], 'Account', data => {
        data.find(acc => {
            if (acc.pName = user && acc.pPassword == pass) {
                pdata.loginData(player.id, data);
                let vgid = vg.setplayerid(player.id);
                vg.spwanplayer(player.id)

            } else {
                console.log("ridi");
            }
        })

    });
});