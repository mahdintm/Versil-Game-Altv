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

function add(pname, id) {
    var thtml = '<table>';
    thtml += '<tr><td>' + pname + '</td><td>' + id + '</td></tr>';
    thtml += '</table>';
    document.getElementById("a").innerHTML += thtml
}


function pri(id) {
    for (let i = 0; i < 1000; i++) {
        if (document.getElementById("a").rows[i].cells[1].innerHTML == i) {
            return document.getElementById("a").rows[i].cells[0].innerHTML;
        }
    }
}