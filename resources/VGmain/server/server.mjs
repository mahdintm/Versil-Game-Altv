import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import './login/login.mjs';
//import pdata from 'playerdata';

alt.on('playerConnect', player => {
    alt.emitClient(player, 'loginweb:Load')
});
alt.on('playerDisconnect', player => {
    vg.deleteplayerid(player.id);
});