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

	ConcreteHelpGuideManager.register('toolbar', function() {
		var i18n = ccmi18n_helpGuides.toolbar;
		var steps = [{
			element: '[data-guide-toolbar-action=edit-page]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
			preventInteraction: true,
		},{
			element: '[data-guide-toolbar-action=page-settings]',
			content: '<h3>' + i18n[1].title + '</h3>' + i18n[1].text,
			preventInteraction: true,
		},{
			element: '[data-guide-toolbar-action=add-content]',
			content: '<h3>' + i18n[2].title + '</h3>' + i18n[2].text,
			preventInteraction: true,
		},{
			element: '[data-guide-toolbar-action=intelligent-search]',
			content: '<h3>' + i18n[3].title + '</h3>' + i18n[3].text,
			preventInteraction: true,
		},{
			element: '[data-guide-toolbar-action=sitemap]',
			content: '<h3>' + i18n[4].title + '</h3>' + i18n[4].text,
			preventInteraction: true,
		},{
			element: '[data-guide-toolbar-action=dashboard]',
			content: '<h3>' + i18n[5].title + '</h3>' + i18n[5].text,
			preventInteraction: true,
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
				ConcreteHelpGuideManager.enterToolbarGuideMode();
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
			},
			onShown: updateFooter,
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			}
		});
	});

})(window, jQuery);
