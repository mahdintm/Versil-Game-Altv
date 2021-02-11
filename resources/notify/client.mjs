import * as alt from 'alt';
import native from 'natives';

alt.onServer('shownotify', (
    message,
    title,
    subtitle,
    icon,
    color = undefined,
    blink = false
) => {
    icon = icon.toUpperCase();
    if (icon === 'PLAYER') {
        let pedHeadshot = native.registerPedheadshot(alt.Player.local.scriptID);
        icon = await loadPlayerHead(pedHeadshot);
    }

    native.beginTextCommandThefeedPost('STRING');
    PushLongString(message, textblock => {
        native.addTextComponentSubstringPlayerName(textblock);
    });

    // Set the notification icon, title and subtitle.
    native.endTextCommandThefeedPostMessagetext(icon, icon, false, 0, title, subtitle);
    if (color) native.thefeedSetNextPostBackgroundColor(color);
    native.endTextCommandThefeedPostTicker(blink, false);

    native.unregisterPedheadshot(alt.Player.local.scriptID);
});

function loadPlayerHead(pedHeadshot) {
    return new Promise(resolve => {
        let interval = alt.setInterval(() => {
            if (native.isPedheadshotReady(pedHeadshot) && native.isPedheadshotValid(pedHeadshot)) {
                alt.clearInterval(interval);
                return resolve(native.getPedheadshotTxdString(pedHeadshot));
            }
        }, 0);
    });
}