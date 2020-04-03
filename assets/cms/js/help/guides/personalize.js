/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ConcreteHelpGuideManager, Tour, ConcreteEvent */

;(function(global, $) {

	ConcreteHelpGuideManager.register('personalize', function() {
		var i18n = ccmi18n_helpGuides.personalize;
		var hideOverlay = function() {
			ConcreteHelpGuideManager.hideOverlay();
		};
		var steps = [{
			element: '[data-guide-toolbar-action=page-settings]',
			title: i18n[0].title,
			content: i18n[0].text,
			onShown: function(tour) {
				$('.popover.tour-tour .popover-navigation .btn-group').hide();
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
			title: i18n[1].title,
			content: i18n[1].text,
			onShown: function(tour) {
				$('.popover.tour-tour .popover-navigation .btn-group').hide();
				ConcreteEvent.subscribe('PanelOpenDetail.concretePersonalizeTour', function(e, data) {
					setTimeout(function() {
						if (data.panel.identifier == 'page-design') {
							tour.next();
						}
					}, 500);
				});
			},
			onHide: function() {
				ConcreteEvent.unsubscribe('PanelOpenDetail.concretePersonalizeTour');
			}
		},{
			element: 'span.ccm-page-design-theme-customize',
			title: i18n[2].title,
			content: i18n[2].text,
		}];

		return new Tour({
			steps: steps,
			framework: 'bootstrap4',
			localization: ccmi18n_tourist,
			storage: false,
			showProgressBar: false,
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
