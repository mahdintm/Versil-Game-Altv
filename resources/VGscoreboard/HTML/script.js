let table = document.getElementById('playerlist');

function get(id) {
    let table = document.getElementById('playerlist');
    for (var i = 1; i < 1000; i++) {
        if (table.rows[i] != undefined) {
            if (table.rows[i].cells[0].innerHTML == id) {
                console.log("Name : ", table.rows[i].cells[0].innerHTML);
                console.log("id : ", table.rows[i].cells[1].innerHTML);
            }
        }
    }
}

function dl(id) {
    let table = document.getElementById('playerlist');
    for (var i = 1; i < 1000; i++) {
        if (table.rows[i] != undefined) {
            if (table.rows[i].cells[0].innerHTML == id) {
                table.deleteRow(i);
            }
        }
    }
}

function setping(id, ping) {
    let table = document.getElementById('playerlist');
    for (var i = 1; i < 1000; i++) {
        if (table.rows[i] != undefined) {
            if (table.rows[i].cells[0].innerHTML == id) {
                table.rows[i].cells[2].innerHTML = ping;
            }
        }
    }
}

alt.on('addrow', (id, pname) => {
    console.log("mano seda kard3")
    let table = document.getElementById('playerlist');
    var thtml = '<table>';
    thtml += '<tr><td>' + id + '</td><td>' + pname + '</td><td>0</td></tr>';
    thtml += '</table>';
    console.log(table)
    table.innerHTML += thtml
});
alt.on('show', () => {
    document.getElementById("wrap").style.display = "block";
});

alt.on('close', () => {
    document.getElementById("wrap").style.display = "none";
});