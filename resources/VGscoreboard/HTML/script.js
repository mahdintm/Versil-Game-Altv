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

alt.on('deleterowsc', (id) => {
    let table = document.getElementById('playerlist');
    for (var i = 1; i < 1000; i++) {
        if (table.rows[i] != undefined) {
            if (table.rows[i].cells[0].innerHTML == id) {
                table.deleteRow(i);
            }
        }
    }
})

alt.on('updateping', (id, ping) => {
    let table = document.getElementById('playerlist');
    for (var i = 1; i < 1000; i++) {
        if (table.rows[i] != undefined) {
            if (table.rows[i].cells[0].innerHTML == id) {
                if (ping - 45 <= 0) {
                    table.rows[i].cells[2].innerHTML = 1;
                } else {
                    table.rows[i].cells[2].innerHTML = ping - 45;
                }
            }
        }
    }
})

alt.on('addrow', (id, pname, ping) => {
    let table = document.getElementById('playerlist');
    var row = table.insertRow(id);
    var cid = row.insertCell(0);
    var cname = row.insertCell(1);
    var cping = row.insertCell(2);
    cid.innerHTML = id;
    cname.innerHTML = pname;
    cping.innerHTML = ping;
});

alt.on('updaterowscw', (id, pname) => {
    let table = document.getElementById('playerlist');
    if (table.rows[id] == undefined) {
        var row = table.insertRow(id);
        var cid = row.insertCell(0);
        var cname = row.insertCell(1);
        var cping = row.insertCell(2);
        cid.innerHTML = id;
        cname.innerHTML = pname;
        cping.innerHTML = 0;
    }
});

alt.on('show', () => {
    document.getElementById("wrap").style.display = "block";
});

alt.on('close', () => {
    document.getElementById("wrap").style.display = "none";
});