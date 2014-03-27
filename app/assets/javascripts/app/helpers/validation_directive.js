Helper.directive('chValidate', function(){
	var linker = function(scope, elem, attrs) {
		elem.bind('blur', function() {
			if (scope.model) {
				elem.parent().parent().removeClass('has-error');
			} else {
				elem.parent().parent().addClass('has-error');
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
});