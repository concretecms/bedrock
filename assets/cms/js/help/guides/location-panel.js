/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

    function updateFooter(tour) {
        var $tour = $('.ccm-help-tour'),
            numSteps = tour.getStepCount();
        if (numSteps > 1) {
            $tour
                .find('.ccm-help-tour-position-index').text(1 + tour.getCurrentStepIndex()).end()
                .find('.ccm-help-tour-position-count').text(numSteps).end()
        } else {
            $tour.find('.ccm-help-tour-footer').remove();
        }
    }

	ConcreteHelpGuideManager.register('location-panel', function() {
		var i18n = ccmi18n_helpGuides['location-panel'];
		var steps = [{
			element: '#ccm-panel-detail-page-location button[name=location]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
		},{
			element: '#ccm-panel-detail-page-location p.lead:first',
			content: '<h3>' + i18n[1].title + '</h3>' + i18n[1].text,
		}];

		return new Tour({
			steps: steps,
			framework: 'bootstrap4',
            template: ccmi18n_tourist.template,
            localization: ccmi18n_tourist.localization,
			storage: false,
			showProgressBar: false,
            sanitizeWhitelist: {
                'a': [/^data-/, 'href'],
            },
			onPreviouslyEnded: function(tour) {
				tour.restart();
			},
			onStart: function() {
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
			},
            onShown: updateFooter,
		});
	});

})(window, jQuery);
