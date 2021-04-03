import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import pdata from 'playerdata';
import sc from 'VGscoreboard';
import serverdata from '../../../db/config.json';
import SQL from '../../../db/database.mjs';
import vdata from 'vehicledata';
import { Account, hwBans } from '../../../db/entities/data.mjs';
// import Discord from 'VGdiscord';
const db = new SQL('mysql', serverdata.host_mysql, serverdata.port_mysql, serverdata.user_mysql, serverdata.pass_mysql, serverdata.db_mysql, [Account, hwBans]);
alt.onClient('registerServer', (player, user, pass, email) => {
    db.upsertData({ pName: user.toLowerCase(), pPassword: pass, pEmail: email }, 'Account', res => {
        alt.emitClient(player, 'loginbyregister', user, pass);
    });
});
//for Login Player
alt.onClient('serverlogin', (player, user, pass) => {
    db.fetchAllByField('pName', user, 'Account', data => {
        if (data[0] != undefined) {
            const a = data.find(acc => {
                if (acc.pName === (user.toLowerCase()) && acc.pPassword === pass) {
                    if (acc.pDiscord == 0) {
                        alt.emitClient(player, 'loginweb:close');
                        alt.emit('authDISCORD', player);
                    } else {
                        pdata.loginData(player.id, data, user);
                        vg.spawnplayer(player.id);
                        let id = vg.setplayerid(player.id);
                        sc.addrow(id, player.id, pdata.getplayername(player.id), player.ping);
                        alt.emitClient(player, 'loginweb:close');
                        alt.emitClient(player, "nativeset", player);
                        vdata.loadpersonalveh(player)
                    }
                } else {
                    alt.emitClient(player, 'loginweb:erroruserpass');
                }
            })
        } else {
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

function checkhwban(player) {
    let ckeckb = true
    for (let i = 1; i < serverdata.max_player; i++) {
        if (i != serverdata.max_player - 1) {
            db.fetchAllByField('id', i, 'hwBans', data => {
                if (data[0] != undefined) {
                    data.find(dhwban => {
                        if (dhwban.hwID == player.hwidExHash) {
                            ckeckb = false
                            var realtime = Date.now();
                            var bantime = dhwban.time;
                            if (bantime >= realtime) {
                                alt.emitClient(player, 'hwbanweb:Load');
                            } else {
                                db.deleteByIds(i, 'hwBans', data => {})
                                alt.emitClient(player, 'loginweb:Load');
                            }
                        }
                    })
                }
            });
        } else {
            return ckeckb
        }
    }
};

alt.on('playerConnect', player => {

    if (checkhwban(player) == true) {
        alt.emitClient(player, 'loginweb:Load');
    }

});