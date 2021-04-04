import * as alt from 'alt';
let webview;
alt.onServer('hud:Load', (name, money) => {
    webview = new alt.WebView('http://resource/client/html/index.html');
    alt.setTimeout(() => {
        webview.emit('WEBHUD:getplayername', name);
        webview.emit('WEBHUD:getplayermoney', money);
    }, 200);

});

alt.onServer('HUD:playername', (nm) => {
    webview.emit('WEBHUD:getplayername', nm);
});

alt.onServer('HUD:playermoney', (money) => {
    webview.emit('WEBHUD:getplayername', money);
});