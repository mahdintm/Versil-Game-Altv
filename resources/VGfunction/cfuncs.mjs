import * as alt from 'alt';
import game from 'natives';

alt.onServer('setIntoVehicle', (veh) => {
    alt.setTimeout(() => {
        game.setPedIntoVehicle(alt.Player.local.scriptID, veh.scriptID, -1);
    }, 800);
});

alt.onServer('sendnotif', (message, iconType, title = "Test 1", subtitle = "Test 2", notifImage = "char_antonia", backgroundColor = null, durationMult = 1) => {
    game.beginTextCommandThefeedPost('STRING')
    game.addTextComponentSubstringPlayerName(message)
    if (backgroundColor != null) game.thefeedSetNextPostBackgroundColor(backgroundColor)
    game.endTextCommandThefeedPostMessagetextTu(notifImage, notifImage, false, iconType, title, subtitle, durationMult)
    return game.endTextCommandThefeedPostTicker(false, true)
});

alt.onServer('exitfromvehicle', (veh, mode) => {
    if (mode == 0) {
        //player normal piade mishe
        game.taskLeaveVehicle(alt.Player.local.scriptID, veh.scriptID, 0)
    } else if (mode == 1) {
        //player be birune mashin teleport misshe
        game.taskLeaveVehicle(alt.Player.local.scriptID, veh.scriptID, 16)
    } else if (mode == 2) {
        //player piade mishe va dar ro baz mizare
        game.taskLeaveVehicle(alt.Player.local.scriptID, veh.scriptID, 256)
    } else if (mode == 3) {
        //player part mishe birun hata age mashin stop bashe
        game.taskLeaveVehicle(alt.Player.local.scriptID, veh.scriptID, 4160)
    } else if (mode == 4) {
        //player az darbe ranande piade mishe
        game.taskLeaveVehicle(alt.Player.local.scriptID, veh.scriptID, 262144)
    }

})
alt.onServer("nativeset", (player) => {

    // native.hideHudComponentThisFrame(6);
    // native.hideHudComponentThisFrame(7);
    // native.hideHudComponentThisFrame(8);
    // native.hideHudComponentThisFrame(9);

    // game.setPedConfigFlag(player.scriptID, 429, true); // Do not start engine automatically 
    game.setPedConfigFlag(player.scriptID, 241, true); // PED_FLAG_DISABLE_STOPPING_VEH_ENGINE
    game.setPedConfigFlag(player.scriptID, 184, true); // PASSENGER SEAT TO DRIVER SEAT

    game.setPedHelmet(player.scriptID, false);
    game.setPedSuffersCriticalHits(player.scriptID, false);

    game.disableControlAction(0, 140, true); // Disable weapon knockout

    // if (player.getSyncedMeta('IsDead') != 0)
    //     game.setPedToRagdoll(player.scriptID, -1, -1, 0, 0, 0, 0);

    // //Disable Auto Passenger To Driver
    // game.setPedConfigFlag(player.scriptID, 184, true);

    //Time set
    alt.setMsPerGameMinute(60000);
})