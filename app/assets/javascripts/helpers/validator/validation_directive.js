Helper.directive('chValidate', ['chValidator', function(validator){

	var linker = function(scope, elem, attrs) {
		elem.bind('blur', function() {
			if (validator.isInvalid(scope.model)) {
				elem.addClass('has-error');
			} else {
				elem.removeClass('has-error');
			}
		});
	};

	return {
		restrict: 'A C',
		link: linker,
		scope: {
			model: '=chValidate'
		}
	}
}]);