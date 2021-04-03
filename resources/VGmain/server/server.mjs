import * as alt from 'alt';
//import chat from 'chat';
import vg from 'VGfunction';
import pdata from 'playerdata';
import sc from 'VGscoreboard';
import './login/login.mjs';
import vdata from 'vehicledata';

alt.on('playerDisconnect', player => {
    sc.deleterow(player.id);
    vdata.deletepersonalveh(player)
    vg.deleteplayerid(player.id);
    pdata.cleardata(player.id);
});