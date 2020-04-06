/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, ConcretePanelManager, Tour, ConcreteEvent, ConcreteMenuManager */

;(function(global, $) {

	ConcreteHelpGuideManager.register('change-content-edit-mode', function() {
		var i18n = ccmi18n_helpGuides['change-content-edit-mode'];
		var steps = [{
			element: '[data-guide-toolbar-action=check-in]',
			title: i18n[0].title,
			content: i18n[0].text,
			preventInteraction: true,
		},{
			element: 'div.ccm-area:not(.ccm-global-area):first .ccm-block-edit:first',
			title: i18n[1].title,
			content: i18n[1].text,
			onShown: function(tour) {
				$('.popover.tour-tour .popover-navigation .btn-group').hide();
				ConcreteEvent.subscribe('ConcreteMenuShow.changeContentEditModeTour', function(e, args) {
					tour.next();
				});
			},
			onHide: function() {
				ConcreteEvent.unsubscribe('ConcreteMenuShow.changeContentEditModeTour');
			}
		},{
			element: 'div#ccm-popover-menu-container div.ccm-edit-mode-block-menu',
			title: i18n[2].title,
			content: i18n[2].text,
			preventInteraction: true,
			onEnd: function() {
				var menu = ConcreteMenuManager.getActiveMenu();
				if (menu) {
					menu.hide();
				}
			},
		},{
			element: '[data-guide-toolbar-action=check-in]',
			title: i18n[3].title,
			content: i18n[3].text,
			preventInteraction: true,
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
		});
	});

})(window, jQuery);
