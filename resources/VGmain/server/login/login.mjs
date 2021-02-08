import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import pdata from 'playerdata';
import SQL from '../../../db/database.mjs';
import { Account } from '../../../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);

alt.onClient('serverlogin', (player, user, pass) => {
    let a;
    let b = false;
    db.fetchAllByField('pName', user, 'Account', data => {

        a = data[0];
        console.log(a);
        b = true;

    });
    sleep(2000);
    if (b == true) {
        if (a[0]["pName"] == (user.toLowerCase()) && a[0]["pPassword"] == pass) {
            pdata.loginData(0, a);
            vg.spawnplayer(player.id);
            alt.emitClient(player, 'loginweb:close');
        } else {
            alt.emitClient(player, 'loginweb:erroruserpass');
        }
    } else {
        console.log("ine");
        alt.emitClient(player, 'loginweb:erroruserpass');
    }
});