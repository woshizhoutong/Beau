$(document).ready(function(){
//	$('#main-content').removeClass('c-noscript');
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
		xhr.setRequestHeader(header, token);
	});
	
	var PageURL = document.location.href;
	if (PageURL.indexOf(getRootFolderName() + '/reports') > -1) {
		$('#li-reports').addClass('active');
	} else if (PageURL.indexOf(getRootFolderName() + '/incidents') > -1) {
		$('#li-incidents').addClass('active');
	} else if (PageURL.indexOf(getRootFolderName() + '/interviews') > -1) {
		$('#li-interviews').addClass('active');
	} else if (PageURL.indexOf(getRootFolderName() + '/userManagement') > -1) {
		$('#li-userManagement').addClass('active');
	}
	
	$('#logout-link').on('click', function(e) {
		$('#logout-form').submit();
	});
});
	// function to get the application name
	function getRootFolderName() {
	    var _location = document.location.toString();
	    var rootFolderNameStartIndex = _location.indexOf('/', _location.indexOf('://') + 3);
	    var rootFolderNameEndIndex = _location.indexOf('/', rootFolderNameStartIndex + 1);
	    var RootFolderName = _location.substring(rootFolderNameStartIndex + 1, rootFolderNameEndIndex);
	    return RootFolderName;
	}
	
	// function to get the today's date
	function getTodaysDate() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10) {
		    dd='0'+dd
		} 
		if(mm<10) {
		    mm='0'+mm
		} 
		today = mm+'/'+dd+'/'+yyyy;
		return today;
	}
	
	// function to get selected value for radio button
	function RadioButtonGetSelectedValue(name) {
		return $('input[name="' + name+ '"]:checked').val();
	}
	
	// function to set selected value for radio button
	function RadionButtonSelectedValueSet(name, SelectdValue) {
	    $('input[name="' + name+ '"][value="' + SelectdValue + '"]').prop('checked', true);
	}
	
	// function to get selected values for check boxes
	function CheckBoxGetCheckedValues(name) {
		var list = [];
		$.each($('input[name="' + name+ '"]:checked'), function(){
			list.push($(this).val());
		});
		return list;
	}
	
	// function to set selected values for check boxes
	function CheckBoxSetSelectedValues(name, selectedValues) {
		$.each(selectedValues, function(index, value){
			$('input[name="' + name+ '"][value="' + value + '"]').prop('checked', true);
		});
	}
	