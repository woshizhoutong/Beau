$(document).ready(function() {
	var login = $('#loginform');
	var recover = $('#recoverform');
	var register = $('#registerform');
	var login_recover = $('#loginform, #recoverform');
	var login_register = $('#loginform, #registerform');
	var recover_register = $('#recoverform, #registerform');
	var accountBox = $('#account-box');
	var userbox = $('#user');
	var animation_speed = 300;

	var loc = window.location + '';
	var ee = loc.split('#');
	if (ee[1] == 'recoverform' && ee[1] != undefined) {
		recover.show();
		login_register.hide();
	} else if (ee[1] == 'registerform' && ee[1] != undefined) {
		register.show();
		login_recover.hide();
	}

	$('.flip-link.to-login').click(function() {
		switch_container(login, recover_register);
	});
	$('.flip-link.to-recover').click(function() {
		switch_container(recover, login_register);
	});
	$('.flip-link.to-register').click(function() {
		switch_container(register, login_recover);
	});
	
	function switch_container(to_show, to_hide) {
		to_show.show('slow');
		to_hide.hide('slow');
	}
	
	login.submit(function(e) {
		e.preventDefault();
		var userInput = $('#username');
		var passInput = $('#password');
		if (userInput.val() == '' || passInput.val() == '') {
			highlightError(userInput);
			highlightError(passInput);
			pushErrors(['Email or password can not be empty'], $('#recover-error-container'));
			accountBox.effect('shake');
		} else {
			$.post('./security_check', $(this).serialize(), function(msg){
				if (msg.status == 'success') {
					window.location.href = '/' + getRootFolderName() + '/home';
//					accountBox.animate({
//						'top' : '+=100px',
//						'opacity' : '0'
//					}, 250, function() {
//						$('.user_name').text(msg.username);
//						userbox.animate({
//							'top' : "+=75px",
//							'opacity' : '1'
//						}, 250, function() {
//							setTimeout(function() {
//								window.location.href = '/' + getRootFolderName() + '/home';
//							}, 600);
//						});
//					});
				} else {
					highlightError(userInput);
					highlightError(passInput);
					pushErrors(['Invalid user name or password'], $('#login-error-container'));
					accountBox.effect('shake');
				}
			});
		}
	});
	
	
	
	

	$('#username, #password').on('keyup', function() {
		highlightError($(this));
	}).focus(function() {
		highlightError($(this));
	}).blur(function() {
		highlightError($(this));
	});

	function pushErrors(errors, errorContainer) {
		var layout = [];
	    layout.push('<div class="alert alert-danger text-left" role="alert">');
	    layout.push('<ul>');
	    for(var i in errors){
			var e = errors[i];
	    	layout.push('<li>');
	    	layout.push(e);
	    	layout.push('</li>');
	    }
	    layout.push('</ul>');
	    layout.push('</div>');
	    errorContainer.html(layout.join(''));
	}

	function highlightError(el) {
		el.parent().addClass('has-error');
	}
});