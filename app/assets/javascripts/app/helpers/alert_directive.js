Helper.directive('tAlert', function() {
	var templateHTML = "<div class='flash row' style='display: none;'>" +
          					 "<div class='alert alert-success alert-dismissable col-sm-6 col-xs-8 col-sm-offset-3'" +
          					 "style='border-radius: 2px; position: absolute; top: 10px; z-index: 1035; box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2); font-size: 85%; padding: 10px; padding-right: 35px;'>" +
          					 "{{alertMessage}}" + 
          					 "<button type='button' class='close' onclick=\"$('.flash').slideUp(function(){$(this).remove})\" aria-hidden='true'>&times;</button>" +
        						 "</div>" + 
        						 "</div>";


	return {
		restrict: 'A C',
		template: templateHTML,
		scope: {
			alertMessage: '='
		},
		link: function(scope, elem, attrs) {
			console.log('recognized new custom directive');
		}
	};
});

