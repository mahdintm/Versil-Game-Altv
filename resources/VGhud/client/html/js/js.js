alt.on('WEBHUD:getplayername', (text) => {
    document.getElementById("playername").innerHTML = text;
});

alt.on('WEBHUD:getplayermoney', (text) => {
    document.getElementById("money").innerHTML = `$ ${text}`;
});