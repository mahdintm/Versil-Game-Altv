import * as alt from 'alt';
alt.on('HUD:setmoney', (player, money) => {
    alt.emitClient(player, 'HUD:playermoney', money)
})