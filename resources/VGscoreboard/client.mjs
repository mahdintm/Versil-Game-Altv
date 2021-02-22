import * as alt from 'alt';
let webview;

alt.on('anyResourceStart', (name) => {
    if (name == "VGscoreboard") {
        webview = new alt.WebView('http://resource/HTML/index.html');
        webview.focus();
    }
})

alt.on('keydown', (key) => {
    if (key == 0x55 && alt.gameControlsEnabled()) {
        alt.emit('scoreboard:Load');
    }
})

alt.on('keyup', (key) => {
    if (key == 0x55 && alt.gameControlsEnabled()) {
        alt.emit('scoreboard:close');
    }
})

alt.on('scoreboard:Load', () => {
    webview.emit('show');
    alt.showCursor(true);
});

alt.on('scoreboard:close', () => {
    webview.emit('close');
    alt.showCursor(false);
});

alt.onServer("addrow", (id, name, ping) => {
    console.log("Client : ", id, " ", name, " ", ping)
    webview.emit('addrow', id, name, ping);
})