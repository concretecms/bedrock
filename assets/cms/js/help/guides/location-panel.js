/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

	ConcreteHelpGuideManager.register('location-panel', function() {
		var i18n = ccmi18n_helpGuides['location-panel'];
		var steps = [{
			element: '#ccm-panel-detail-page-location button[name=location]',
			title: i18n[0].title,
			content: i18n[0].text,
		},{
			element: '#ccm-panel-detail-page-location p.lead:first',
			title: i18n[1].title,
			content: i18n[1].text,
		}];

		return new Tour({
			steps: steps,
			framework: 'bootstrap4',
			localization: ccmi18n_tourist,
			storage: false,
			showProgressBar: false,
			onPreviouslyEnded: function(tour) {
				tour.restart();
			},
			onStart: function() {
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
			},
		});
	});

})(window, jQuery);
