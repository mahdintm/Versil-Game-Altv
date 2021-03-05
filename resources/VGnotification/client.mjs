import * as alt from 'alt';
let webview;

alt.on('anyResourceStart', (name) => {
    if (name == "VGnotification") {
        webview = new alt.WebView('http://resource/html/index.html');
        webview.focus();
    }
})

alt.onServer('addnoti', (img, title, sutitle, text) => {
    webview.emit('addnoti', img, title, sutitle, text);
    console.log(img, title, sutitle, text)
})