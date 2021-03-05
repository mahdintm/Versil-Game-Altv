alt.on('addnoti', (link, title, sutitle, text) => {
    let cansend = true
    var imglink = undefined;
    for (let i = 1; i >= 3; i++) {
        if (document.getElementById(`text${id}`).innerHTML == text) {
            cansend = false
        }
    }
    if (link == "versil") {
        var imglink = "img/versil.png"
    }
    if (cansend = true) {
        if ((document.getElementById('1').innerHTML) == "") {
            var newnot = document.createElement('div');
            newnot.className = 'notif';
            newnot.id = "notif1";
            newnot.innerHTML = '<img src="' + imglink + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" id="' + 'text1' + '">' + text + '</div>';
            document.getElementById('1').appendChild(newnot);
            setTimeout(function() {
                deletenoti(1);
            }, 10000)
        } else if ((document.getElementById('text1').innerHTML) == text) {
            return 0;
        } else if ((document.getElementById(`2`).innerHTML) == "") {
            var newnot = document.createElement('div');
            newnot.className = 'notif';
            newnot.id = "notif2";
            newnot.innerHTML = '<img src="' + imglink + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" id="' + 'text2' + '">' + text + '</div>';
            document.getElementById('2').appendChild(newnot);
            setTimeout(function() {
                deletenoti(2);
            }, 10000)
        } else if ((document.getElementById('text2').innerHTML) == text) {
            return 0;
        } else if ((document.getElementById(`3`).innerHTML) == "") {
            var newnot = document.createElement('div');
            newnot.className = 'notif';
            newnot.id = "notif3";
            newnot.innerHTML = '<img src="' + imglink + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" id="' + 'text3' + '">' + text + '</div>';
            document.getElementById('3').appendChild(newnot);
            setTimeout(function() {
                deletenoti(3);
            }, 10000)
        } else if ((document.getElementById('text3').innerHTML) == text) {
            return 0;
            //     }

        }
    }
});


function deletenoti(id) {
    document.getElementById("notif" + id).classList.add('dsbl');
    setTimeout(() => {
        document.getElementById(id).innerHTML = "";
    }, 1000);

}