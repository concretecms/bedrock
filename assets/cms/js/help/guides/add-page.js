/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour, ConcreteEvent */

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

	ConcreteHelpGuideManager.register('add-page', function() {
		var i18n = ccmi18n_helpGuides['add-page'];
		var hideOverlay = function() {
			ConcreteHelpGuideManager.hideOverlay();;
		}
		var steps = [{
			element: '[data-guide-toolbar-action=sitemap]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
			onShown: function(tour) {
			    updateFooter(tour);
				$('.ccm-help-tour .popover-navigation').hide();
				$('a[data-launch-panel=sitemap]').on('click', hideOverlay);
				ConcreteEvent.subscribe('PanelOpen.concreteAddPageTour', function(e, data) {
					setTimeout(function() {
						var panel = data.panel.getIdentifier();
						if (panel == 'sitemap') {
							tour.next();
						}
					}, 500);
				});
			},
			onHide: function() {
				$('a[data-launch-panel=sitemap]').off('click', hideOverlay);
				ConcreteEvent.unsubscribe('PanelOpen.concreteAddPageTour');
			}
		},{
			element: '#ccm-panel-sitemap header:nth-of-type(1)',
			content: '<h3>' + i18n[1].title + '</h3>' + i18n[1].text,
			placement: 'left',
		},{
			element: '#ccm-panel-sitemap header:nth-of-type(2)',
			content: '<h3>' + i18n[2].title + '</h3>' + i18n[2].text,
			placement: 'left',
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
			},
		});
	});

})(window, jQuery);
