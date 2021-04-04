import * as alt from 'alt';
let webview;
alt.onServer('loginweb:Load', () => {
    webview = new alt.WebView('http://resource/client/login/html/index.html');
    webview.focus();
    alt.showCursor(true);
    webview.on('login', (user, pass) => {
        alt.emitServer('serverlogin', user, pass);
    });
    webview.on('registerSl', (username, password, email) => {
        alt.emitServer('registerServer', username, password, email);
    });
    webview.on('check-AJAX-by-server', (username) => {
        alt.emitServer('checkajax', username);
    });
    alt.onServer('loginbyregister', (userr, passs) => {
        console.log(userr, passs)
        alt.emitServer('serverlogin', userr, passs);
    })
    alt.onServer('loginweb:erroruserpass', () => {
        webview.emit('erroruserpass');
    });
    alt.onServer('answerAJAX', data => {
        webview.emit('call-back-server-for-AJAX', data);
    })
});

alt.onServer('loginweb:close', () => {
    webview.destroy();
    alt.showCursor(false);
})