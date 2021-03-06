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


// function sendMessage() {
//     var request = new XMLHttpRequest();
//     request.open("POST", "");

//     request.setRequestHeader('Content-type', 'application/json');

//     var params = {
//         username: "My Webhook Name",
//         avatar_url: "",
//         content: "The message to send"
//     }

//     request.send(JSON.stringify(params));
// }



// fetch(
//     'https://discord.com/api/webhooks/817785841795334184/iynCjJcNuAXAS_LX8UNu_DNwpI-iRdeJdSWnxErInokxii991T2tsqNhGAPNlpPcfQwT', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             // the username to be displayed
//             username: 'webhook',
//             // the avatar to be displayed
//             avatar_url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
//             // contents of the message to be sent
//             content: 'user mention: <@279098137484722176>, role mention: <@&496160161459863552>, channel mention: <#508500699458306049>',
//             // enable mentioning of individual users or roles, but not @everyone/@here
//             allowed_mentions: {
//                 parse: ['users', 'roles'],
//             },
//             // embeds to be sent
//             embeds: [{
//                 // decimal number colour of the side of the embed
//                 color: 11730954,
//                 // author
//                 // - icon next to text at top (text is a link)
//                 author: {
//                     name: 'dragonwocky',
//                     url: 'https://dragonwocky.me/',
//                     icon_url: 'https://dragonwocky.me/assets/avatar.jpg',
//                 },
//                 // embed title
//                 // - link on 2nd row
//                 title: 'title',
//                 url: 'https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634',
//                 // thumbnail
//                 // - small image in top right corner.
//                 thumbnail: {
//                     url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
//                 },
//                 // embed description
//                 // - text on 3rd row
//                 description: 'description',
//                 // custom embed fields: bold title/name, normal content/value below title
//                 // - located below description, above image.
//                 fields: [{
//                         name: 'field 1',
//                         value: 'value',
//                     },
//                     {
//                         name: 'field 2',
//                         value: 'other value',
//                     },
//                 ],
//                 // image
//                 // - picture below description(and fields)
//                 image: {
//                     url: 'http://tolkiengateway.net/w/images/thumb/7/75/J.R.R._Tolkien_-_Ring_verse.jpg/300px-J.R.R._Tolkien_-_Ring_verse.jpg',
//                 },
//                 // footer
//                 // - icon next to text at bottom
//                 footer: {
//                     text: 'footer',
//                     icon_url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
//                 },
//             }, ],
//         }),
//     }
// );