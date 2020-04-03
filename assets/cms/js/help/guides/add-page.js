/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour, ConcreteEvent */

;(function(global, $) {

	ConcreteHelpGuideManager.register('add-page', function() {
		var i18n = ccmi18n_helpGuides['add-page'];
		var hideOverlay = function() {
			ConcreteHelpGuideManager.hideOverlay();;
		}
		var steps = [{
			element: '[data-guide-toolbar-action=sitemap]',
			title: i18n[0].title,
			content: i18n[0].text,
			onShown: function(tour) {
				$('.popover.tour-tour .popover-navigation .btn-group').hide();
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
			element: '#ccm-panel-sitemap header:first',
			title: i18n[1].title,
			content: i18n[1].text,
			placement: 'bottom',
		},{
			element: '#ccm-panel-sitemap #ccm-sitemap-panel-sitemap',
			title: i18n[2].title,
			content: i18n[2].text,
			placement: 'top',
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
				ConcreteHelpGuideManager.enterToolbarGuideMode();
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
			},
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			},
		});
	});

})(window, jQuery);
