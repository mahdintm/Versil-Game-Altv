import * as alt from 'alt';
import game from 'natives';
game.requestStreamedTextureDict("logo_versil", true)
game.requestModel("logo_versil")
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