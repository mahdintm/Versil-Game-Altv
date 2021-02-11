import * as alt from 'alt';
alt.on('consoleCommand', handleConsoleMessage);

const command = {
    '/test': test
};

function handleConsoleMessage(...args) {
    alt.setTimeout(() => {
        const cmdName = args[0].toLowerCase();

        if (!command[cmdName]) {
            console.log(`'${cmdName}' is not a valid command.`);
            return;
        }

        command[cmdName](...args);
    }, 0);
}

function test(...args) {
    console.log(...args)
}