function addnoti(link, title, sutitle, text) {
    let cansend = true
    for (let i = 1; i >= 5; i++) {
        if (document.getElementById(`text${id}`).innerHTML == text) {
            cansend = false
        }
    }
    if (cansend = true) {
        if ((document.getElementById('1').innerHTML) == "") {
            var newnot = document.createElement('div');
            newnot.className = 'notif';
            newnot.id = "notif1";
            newnot.innerHTML = '<img src="' + link + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" style="font-size: 13px;" id="' + 'text1' + '">' + text + '</div>';
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
            newnot.innerHTML = '<img src="' + link + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" style="font-size: 13px;" id="' + 'text2' + '">' + text + '</div>';
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
            newnot.innerHTML = '<img src="' + link + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" style="font-size: 13px;" id="' + 'text3' + '">' + text + '</div>';
            document.getElementById('3').appendChild(newnot);
            setTimeout(function() {
                deletenoti(3);
            }, 10000)
        } else if ((document.getElementById('text3').innerHTML) == text) {
            return 0;
        }

    }
}

function deletenoti(id) {
    document.getElementById(id).innerHTML = "";
}

function show(id) {
    console.log((document.getElementById('1').innerHTML))
}