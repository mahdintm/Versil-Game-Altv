var reguser = false;
var regemail = true;
var regpassword = true;
var regrepassword = true;

function login() {
    alt.emit('login', $("#usernameText").val(), $("#passwordText").val());
}
alt.on('erroruserpass', () => {
    console.log("ali");
    $("#error_login_response").html("<span style='color: red;'>نام کاربری یا کلمه عبور اشتباه است.</span>");
});

alt.on('call-back-server-for-AJAX', (data) => {
    if (data == 1) {
        $("#uname_response").html("<span style='color: red;'>این نام کاربری قبلاً انتخاب شده است. از نام دیگری استفاده کنید.</span>");
    } else if (data == 2) {
        reguser = true;
        $("#uname_response").html("<span style='color: green;'>این نام کاربری قابل انخاب است.</span>");
    }
});


$(document).ready(function() {
    $("#usernametext").keyup(function() {
        var username = $(this).val().trim();
        var letters = /^[0-9a-zA-Z_.]+$/;
        if (username != '') {
            if (username.match(letters)) {
                if (username.length > 2) {
                    alt.emit('check-AJAX-by-server', username);
                    $("#uname_response").html("<span style='color: red;'></span>");

                } else {
                    $("#uname_response").html("<span style='color: red;'>تعداد نویسه نام کاربری شما باید بین 3 و30 باشد.</span>");
                }

            } else {
                $("#uname_response").html("<span style='color: red;'>فقط حروف (a-z)، اعداد (۰ تا ۹) و نقطه (.) مجاز است.</span>");
            }
        } else {
            $("#uname_response").html("");
        }
    });
});

function register() {
    if (reguser == true) {
        if (regemail == true) {
            if (regpassword == true) {
                if (regrepassword == true) {
                    alt.emit('registerSl', $("#usernametext").val(), $("#passwordtext").val(), $("#email").val());
                }
            }
        }
    } else {
        console.log("slm aley");
    }
}