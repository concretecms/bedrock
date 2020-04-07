/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, ConcretePanelManager, Tour, ConcreteEvent, ConcreteMenuManager */

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

	ConcreteHelpGuideManager.register('change-content-edit-mode', function() {
		var i18n = ccmi18n_helpGuides['change-content-edit-mode'];
		var steps = [{
			element: '[data-guide-toolbar-action=check-in]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
			preventInteraction: true,
			onShow: function(tour) {
			    updateFooter(tour);
			    ConcreteHelpGuideManager.enterToolbarGuideMode();
			},
			onHide: function(tour) {
			    ConcreteHelpGuideManager.exitToolbarGuideMode();
			},
		},{
			element: 'div.ccm-area:not(.ccm-global-area):first .ccm-block-edit:first',
			content: '<h3>' + i18n[1].title + '</h3>' + i18n[1].text,
			onShown: function(tour) {
			    updateFooter(tour);
				$('.ccm-help-tour .popover-navigation').hide();
				ConcreteEvent.subscribe('ConcreteMenuShow.changeContentEditModeTour', function(e, args) {
					tour.next();
				});
			},
			onHide: function() {
				ConcreteEvent.unsubscribe('ConcreteMenuShow.changeContentEditModeTour');
			}
		},{
			element: 'div#ccm-popover-menu-container div.ccm-edit-mode-block-menu',
			content: '<h3>' + i18n[2].title + '</h3>' + i18n[2].text,
			preventInteraction: true,
			onEnd: function() {
				var menu = ConcreteMenuManager.getActiveMenu();
				if (menu) {
					menu.hide();
				}
			},
		},{
			element: '[data-guide-toolbar-action=check-in]',
			content: '<h3>' + i18n[3].title + '</h3>' + i18n[3].text,
			preventInteraction: true,
            onShow: function(tour) {
                updateFooter(tour);
                ConcreteHelpGuideManager.enterToolbarGuideMode();
            },
            onHide: function(tour) {
                ConcreteHelpGuideManager.exitToolbarGuideMode();
            },
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
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
				if (!global.CCM_EDIT_MODE) {
					tour.end();
					return;
				}
				ConcretePanelManager.getPanels().forEach(function(panel) {
					if (panel.isOpen) {
						panel.hide();
					}
				});
			},
            onShown: updateFooter,
		});
	});

})(window, jQuery);
