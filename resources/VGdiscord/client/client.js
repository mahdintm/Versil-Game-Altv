/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';

let view;
let discordURL;

alt.log('[Test]');
var user = undefined;
var pass = undefined;
alt.onServer('discord:Auth', handleDiscordAuth);
alt.onServer('discord:AuthExit', handleAuthExit);
alt.on('discord:Auth', handleDiscordAuth);
alt.on('discord:AuthExit', handleAuthExit);

alt.onServer('discord:veryfied', discordveryfied);

function discordveryfied() {
    alt.emitServer('serverlogin', user, pass);
}

function handleDiscordAuth(url, puser, ppass) {
    if (view && view.destroy) {
        view.destroy();
    }
    user = puser;
    pass = ppass;
    discordURL = url;
    view = new alt.WebView('http://resource/client/html/index.html');
    view.on('discord:BearerToken', handleBearerToken);
    view.on('discord:Ready', handleReady);
    view.focus();

    showCursor(true);
}

function handleAuthExit() {
    if (view && view.destroy) {
        view.destroy();
    }

    showCursor(false);
}

function handleBearerToken(token) {
    alt.emitServer('discord:BearerToken', token);
}

function handleReady() {
    if (!view) {
        return;
    }

    view.emit('discord:Ready', discordURL);
}

function showCursor(state) {
    try {
        alt.showCursor(state);
    } catch (err) {
        return;
    }
}