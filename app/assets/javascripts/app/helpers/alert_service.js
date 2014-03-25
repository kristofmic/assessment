Helper.factory('Alert', function(){

	var error = function(errors){
		var e = errors.length > 1 ? "errors" : "error";

		var errorList = "";
		for (var i = 0; i < errors.length; i++){
			errorList += "<li>" + errors[i] + "</li>";
		}

		var $alert = angular.element(	"<div class='row flash' style='display: none;'>" +
							          					"<div class='alert alert-danger alert-dismissable col-sm-6 col-xs-8 col-sm-offset-3'>" +
							          					"The form contains " + errors.length + " " + e +
							          					"<button type='button' class='close' onclick=\"$('.flash').slideUp(function(){$(this).remove})\" aria-hidden='true'>&times;</button>" +
							          					"<ul>" + errorList + "</ul>" +
							        						"</div>" + 
							        						"</div>"
							        						);
		insert_element($alert);
	};

	var success = function(message){
		var $alert = angular.element(	"<div class='flash row' style='display: none;'>" +
							          					"<div class='alert alert-success alert-dismissable col-sm-6 col-xs-8 col-sm-offset-3'>" +
							          					message + 
							          					"<button type='button' class='close' onclick=\"$('.flash').slideUp(function(){$(this).remove})\" aria-hidden='true'>&times;</button>" +
							        						"</div>" + 
							        						"</div>"
							        						);
		insert_element($alert);
	}

	function insert_element($element){
		$('.flash').remove();
		$('#alerts').append($element);
		$($element).slideDown();
		window.setTimeout(function(){ $($element).slideUp(function(){$(this).remove}); }, 5000);
	}

	function clear(){
		if ($('.flash').length > 0){
			window.setTimeout(function(){ $('.flash').slideUp(function(){$(this).remove}); }, 5000);
		}
	}

	return {
		error: error,
		success: success,
		clear: clear
	}
});