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