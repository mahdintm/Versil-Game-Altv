let noti = 1;

// function add(img, title, sutitle, text) {

// }

// var p = document.createElement('p');
// p.innerHTML = '<b>' + name + ': </b>' + colorify(text) + '<br>';
// messagesBlock.appendChild(p);

function test(link, title, sutitle, text) {

    var newnot = document.createElement('div');
    newnot.className = 'notif';
    newnot.v = 0;
    newnot.innerHTML = '<img src="' + link + '" alt="logo" class="imglogo"><div style="display: inline;"><div class="title">' + title + '</div><div class="sutitle">' + sutitle + '</div></div><div class="data" style="font-size: 13px;">' + text + '</div>';
    document.getElementById('back').appendChild(newnot);
    //document.body.appendChild(element);
}