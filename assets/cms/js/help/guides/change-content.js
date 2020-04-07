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

	ConcreteHelpGuideManager.register('change-content', function() {
		var i18n = ccmi18n_helpGuides['change-content'];
		var steps = [{
			element: '[data-guide-toolbar-action=edit-page]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
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
			onStart: function(tour) {
				ConcreteHelpGuideManager.clearGuideToLaunchOnRefresh();
				ConcreteHelpGuideManager.enterToolbarGuideMode();
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
				if (global.CCM_EDIT_MODE) {
					tour.end();
					setTimeout(function() {
						ConcreteHelpGuideManager.getGuide('change-content-edit-mode').start();
					}, 0);
				} else {
					ConcreteHelpGuideManager.launchGuideOnRefresh('change-content-edit-mode');
				}
			},
            onShown: updateFooter,
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			},
		});
	});

})(window, jQuery);
