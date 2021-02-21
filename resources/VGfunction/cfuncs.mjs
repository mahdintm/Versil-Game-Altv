import * as alt from 'alt';
import game from 'natives';

alt.onServer('setIntoVehicle', (veh) => {
    alt.setTimeout(() => {
        game.setPedIntoVehicle(alt.Player.local.scriptID, veh.scriptID, -1);
    }, 800);
});

alt.onServer('addrowscoreboard', (playerid, playername) => {

})