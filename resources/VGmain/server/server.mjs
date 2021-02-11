import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import './login/login.mjs';
//import pdata from 'playerdata';

alt.on('playerConnect', player => {
    alt.emitClient(player, 'loginweb:Load')
});
<<<<<<< HEAD
//in cmd marbut be span mashine
chat.registerCmd('veh', (player, args) => {
=======

<<<<<<< HEAD
>>>>>>> 5b36bf912e2767396c419ca7f99e6f60fbf56dd8


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
=======
alt.on('playerDisconnect', player => {
    vg.deleteplayerid(player.id);
});
>>>>>>> 1e3291870c0351721f83d8f276d7172d9e4d17b4
