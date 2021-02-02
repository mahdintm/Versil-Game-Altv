import * as alt from 'alt';
import * as native from 'natives';
//login Server
alt.onServer('webview:Load', () => {
    console.log('revale triiger');
    const webview = new alt.WebView('http://resource/client/html/index.html');
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    webview.focus();
    alt.showCursor(true);
    webview.on('loginweb', () => {
        alt.emitServer('login', user, pass);
    });
    // alt.emit('closeWebView', webview)
    // alt.showCursor(true);
})