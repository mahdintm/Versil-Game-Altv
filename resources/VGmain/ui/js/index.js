function showLogin() {
  $('#loginmenu').show();
  $('#registermenu').hide();
  $('#recovermenu').hide();
};

function showRegister() {
  $('#registermenu').show();
  $('#loginmenu').hide();
  $('#recovermenu').hide();
};

function showRecover() {
  $('#registermenu').hide();
  $('#loginmenu').hide();
  $('#recovermenu').show();
};

function showErrorBox(errorText) {
	$('#errormenu').show();
	$('#textMessage').show();
	document.getElementById("textMessage").innerHTML = errorText;
	setTimeout(hideErrorBox, 5000);
	
};

function hideErrorBox() {
	document.getElementById("textMessage").innerHTML = '';
	$('#errormenu').hide();
};

function showSuccesBox(succesText) {
	$('#succesmenu').show();
	$('#textMessageSucces').show();
	document.getElementById("textMessageSucces").innerHTML = succesText;
	setTimeout(hideSuccesBox, 5000);
	
};

function hideSuccesBox() {
	document.getElementById("textMessageSucces").innerHTML = '';
	$('#succesmenu').hide();
};

