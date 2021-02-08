import * as alt from 'alt';
console.log("im starts");
let webview;
alt.onServer('loginweb:Load', () => {
    webview = new alt.WebView('http://resource/client/login/html/index.html');
    webview.focus();
    alt.showCursor(true);
    webview.on('login', (user, pass) => {
        alt.emitServer('serverlogin', user, pass);
    })
    alt.onServer('loginweb:erroruserpass', () => {
        webview.emit('erroruserpass');
    })
});

alt.onServer('loginweb:close', () => {
    console.log("errorrrrr");
    webview.destroy();
})