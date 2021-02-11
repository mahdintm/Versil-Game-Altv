import * as alt from 'alt';
import chat from 'chat';
import vg from 'VGfunction';
import './login/login.mjs';
import pdata from 'playerdata';

//cmd /Milad
chat.registerCmd('Milad', (player, args) => {
    chat.send("Miald Khaiemal ast.")
});


alt.on('playerConnect', player => {
    alt.emitClient(player, 'loginweb:Load')
});

chat.registerCmd('veh', (player, args) => {
    const newveh = new alt.Vehicle(args[0], -2639.872, 1866.812, 160.135, 0, 0, 0);
    alt.emitClient(player, 'vehicle:SetInto', newveh);
});

// chat.registerCmd('g', (player, args) => {

//     player.model = 'mp_m_freemode_01';
//     player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 1);

// });3


// import SQL from '../../db/database.mjs';
// import { Account } from '../../db/entities/data.mjs';

// const db = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
// var pInfo = {};
// chat.registerCmd('insert', (player, args) => {
//     db.upsertData({ pName: args[0], pPassword: args[1] }, 'Account',
//         res => {
//             console.log(res)
//         });
// });

// chat.registerCmd('select', (player, args) => {
//     db.fetchAllByField('pName', args[0], 'Account', data => {
//         console.log(data)
//         pInfo[0] = data[0];
//     });
// });

// chat.registerCmd('test2', (player, args) => {
//     vg.setplayermodel(args[0], args[1]);
// })
// const spawnPos = {
//     x: -2639.872,
//     y: 1866.812,
//     z: 160.135
// };
// const spawnP = {
//     x: -1446.072,
//     y: 5411.912,
//     z: 24.83151
// };