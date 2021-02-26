import * as alt from 'alt';
let webview;

alt.on('anyResourceStart', (name) => {
    if (name == "VGnotification") {
        webview = new alt.WebView('http://resource/html/index.html');
        webview.focus();
    }
})