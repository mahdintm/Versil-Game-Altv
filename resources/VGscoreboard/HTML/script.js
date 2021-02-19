let table = document.getElementById('playerlist');

function addMessage(name, text) {
    var insert = document.getElementById("a");
    var new_row = insert.parentNode.insertRow(insert.rowIndex + 1);
    new_row.insertCell(0).innerHTML = "test";
    new_row.insertCell(1).innerHTML = "test2";
    return "aaa";
}

function addrow(playername, id, ping) {
    // $('#a').append = "<tr><td>February</td><td>$80</td></tr>";
    $('.playerlist')[0].append('<tr><td></td><td>$80</td></tr>');

}

function add(id, pname) {
    let table = document.getElementById('playerlist');
    var thtml = '<table>';
    thtml += '<tr><td>' + id + '</td><td>' + pname + '</td><td></td></tr>';
    thtml += '</table>';
    console.log(table)
    table.innerHTML += thtml
}

function pri(id) {
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