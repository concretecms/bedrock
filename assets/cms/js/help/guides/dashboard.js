/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ConcreteHelpGuideManager, Tour, ConcreteEvent */

;(function(global, $) {

	ConcreteHelpGuideManager.register('dashboard', function() {
		var i18n = ccmi18n_helpGuides.dashboard;
		var hideOverlay = function() {
			ConcreteHelpGuideManager.hideOverlay();
		};
		var steps = [{
			element: '[data-guide-toolbar-action=dashboard]',
			title: i18n[0].title,
			content: i18n[0].text,
			onShown: function(tour) {
				$('.popover.tour-tour .popover-navigation .btn-group').hide();
				$('a[data-launch-panel=dashboard]').on('click', hideOverlay);
				ConcreteEvent.subscribe('PanelOpen.concreteDashboardTour', function(e, data) {
					setTimeout(function() {
						var panel = data.panel.getIdentifier();
						if (panel == 'dashboard') {
							tour.next();
						}
					}, 500);
				});
			},
			onHide: function() {
				$('a[data-launch-panel=dashboard]').off('click', hideOverlay);
				ConcreteEvent.unsubscribe('PanelOpen.concreteDashboardTour');
			},
		},{
			element: 'div#ccm-panel-dashboard ul.nav a[href$=sitemap]:first',
			title: i18n[1].title,
			content: i18n[1].text,
			placement: 'left',
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
