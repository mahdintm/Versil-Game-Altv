import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import pdata from 'playerdata';
import sc from 'VGscoreboard';
import SQL from '../../../db/database.mjs';
import { Account } from '../../../db/entities/data.mjs';
const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
alt.onClient('registerServer', (player, user, pass, email) => {
    db.upsertData({ pName: user.toLowerCase(), pPassword: pass, pEmail: email }, 'Account', res => {});
    //alt.emitClient(player, 'loginbyregister', user, pass);
})
alt.onClient('serverlogin', (player, user, pass) => {
    db.fetchAllByField('pName', user, 'Account', data => {
        if (data[0] != undefined) {
            const a = data.find(acc => {
                if (acc.pName === (user.toLowerCase()) && acc.pPassword === pass) {
                    pdata.loginData(player.id, data, user);
                    vg.spawnplayer(player.id);
                    let id = vg.setplayerid(player.id);
                    sc.addrow(id, player.id, pdata.getplayername(player.id), player.ping);
                    alt.emitClient(player, 'loginweb:close');
                } else {
                    alt.emitClient(player, 'loginweb:erroruserpass');
                }
            })

        } else {
            console.log("ine");
            alt.emitClient(player, 'loginweb:erroruserpass');
        }
    });
});

alt.onClient('checkajax', (player, username) => {
    db.fetchAllByField('pName', username, 'Account', data => {
        if (data[0] != undefined) {
            alt.emitClient(player, 'answerAJAX', 1);
        } else {
            alt.emitClient(player, 'answerAJAX', 2);
        }
    });
})