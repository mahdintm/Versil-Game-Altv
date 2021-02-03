import * as alt from 'alt';
import chat from 'chat';
import vg from 'VGfunction'
import SQL from '../db/database.mjs';
import { Account } from '../db/entities/data.mjs';

const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
var pInfo = {};
chat.registerCmd('insert', (player, args) => {
    db.upsertData({ pName: args[0], pPassword: args[1] }, 'Account',
        res => {
            console.log(res)
        });
});

chat.registerCmd('select', (player, args) => {
    db.fetchAllByField('pName', args[0], 'Account', data => {
        pInfo[0] = data[0];
    });
});
chat.registerCmd('aa', (player, args) => {
    console.log(vg.getplayerid(args[0]));
});

const spawnPos = {
    x: -2639.872,
    y: 1866.812,
    z: 160.135
};
const spawnP = {
    x: -1446.072,
    y: 5411.912,
    z: 24.83151
};
alt.on('playerConnect', player => {
    vg.VGsetplayerid(player.id);
    player.model = 'mp_m_freemode_01';
    player.spawn(spawnP.x, spawnP.y, spawnP.z, 1);

});

chat.registerCmd('veh', (player, args) => {

    try {
        const newveh = new alt.Vehicle(args[0], -2639.872, 1866.812, 160.135, 0, 0, 0);
        alt.emitClient(player, 'vehicle:SetInto', newveh);
    } catch (err) {
        chat.send(player, "");
    }

});

chat.registerCmd('g', (player, args) => {

    player.model = 'mp_m_freemode_01';
    player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 1);

});