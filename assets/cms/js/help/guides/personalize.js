/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour, ConcreteEvent */

;(function(global, $) {

	ConcreteHelpGuideManager.register('personalize', function() {
		var i18n = ccmi18n_helpGuides.personalize;
		var hideOverlay = function() {
			ConcreteHelpGuideManager.hideOverlay();
		};
		var steps = [{
			element: '[data-guide-toolbar-action=page-settings]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
			onShown: function(tour) {
			    ConcreteHelpGuideManager.updateStepFooter(tour);
				$('.ccm-help-tour .popover-navigation').hide();
				$('a[data-launch-panel=page]').on('click', hideOverlay);
				ConcreteEvent.subscribe('PanelOpen.concretePersonalizeTour', function(e, data) {
					setTimeout(function() {
						var panel = data.panel.getIdentifier();
						if (panel == 'page') {
							tour.next();
						}
					}, 500);
				});
			},
			onHide: function() {
				$('a[data-launch-panel=page]').off('click', hideOverlay);
				ConcreteEvent.unsubscribe('PanelOpen.concretePersonalizeTour');
			}
		},{
			element: 'a[data-launch-panel-detail=page-design]:first',
			content: '<h3>' + i18n[1].title + '</h3>' + i18n[1].text,
			onShown: ConcreteHelpGuideManager.updateStepFooter,
			onHide: function() {
				ConcreteEvent.unsubscribe('PanelOpenDetail.concretePersonalizeTour');
			}
		},{
			element: 'span.ccm-page-design-theme-customize',
			content: '<h3>' + i18n[2].title + '</h3>' + i18n[2].text,
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
			onStart: function() {
				ConcreteHelpGuideManager.enterToolbarGuideMode();
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
			},
            onShown: function(tour) {
                var $tour = $('.ccm-help-tour'),
                    numSteps = tour.getStepCount();
                if (numSteps > 1) {
                    $tour
                        .find('.ccm-help-tour-position-index').text(1 + tour.getCurrentStepIndex()).end()
                        .find('.ccm-help-tour-position-count').text(numSteps).end()
                } else {
                    $tour.find('.ccm-help-tour-footer').remove();
                }
            },
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			},
		});
	});

})(window, jQuery);
