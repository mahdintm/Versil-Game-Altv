import * as alt from 'alt';
console.log("im starts");
alt.onServer('loginweb:Load', () => {
    const webview = new alt.WebView('http://resource/client/login/html/index.html');
    webview.focus();
    alt.showCursor(true);
    webview.on('login', (user, pass) => {
        console.log("mn tu clientm");
        alt.emitServer('serverlogin', (user, pass));
    })
});