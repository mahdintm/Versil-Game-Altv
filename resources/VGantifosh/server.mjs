var badwords = [
    "daus",
    "jakesh"
];
//--------------------------------- System Finding ---------------------------------//
export function findfosh(msg) {
    for (var i = 0; i < badwords.length; i++) {
        var pat = badwords[i].slice(0, -1).replace(/([a-z])/g, "$1[^a-z]*") + badwords[i].slice(-1);
        var rxp = new RegExp(pat, "ig");
        msg = msg.replace(rxp, "****");
    }
    return msg
}



export default { findfosh }