var clock = new Vue({
    el: '#clock',
    data: {
        time: ''
    }
});
var date = new Vue({
    el: '#date',
    data: {
        date: ''
    }
});

var week = ['یک شنبه', 'دوشنبه', 'پنجشنبه', 'چهارشنبه', 'سه شنبه', 'جمعه', 'شنبه'];
var timerID = setInterval(updateTime, 1000);
updateTime();

function updateTime() {
    var cd = new Date();
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2);
    date.date = zeroPadding(cd.getFullYear(), 4) + ' / ' + zeroPadding(cd.getMonth() + 1, 2) + ' / ' + zeroPadding(cd.getDate(), 2) + ` ` + week[cd.getDay()];
};

function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}