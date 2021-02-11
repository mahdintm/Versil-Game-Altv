import * as alt from 'alt';
import chat from 'chat';
import vg from 'VGfunction';

function adminchat(player, ...msg) {
    vg.adminchat(player, ...msg);
}

chat.registerCmd('a', adminchat);