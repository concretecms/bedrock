/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

	ConcreteHelpGuideManager.register('add-content-edit-mode', function() {
		var i18n = ccmi18n_helpGuides['add-content-edit-mode'];
		var steps = [{
			element: '[data-guide-toolbar-action=add-content]',
			title: i18n[0].title,
			content: i18n[0].text,
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block',
			title: i18n[1].title,
			content: i18n[1].text,
			placement: 'right',
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block .ccm-panel-header-accordion',
			title: i18n[2].title,
			content: i18n[2].text,
			placement: 'right',
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block input[data-input=search-blocks]',
			title: i18n[3].title,
			placement: 'right',
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block .ccm-panel-add-block-draggable-block-type:first',
			title: i18n[4].title,
			content: i18n[4].text,
			placement: 'right',
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
				if (!$('#ccm-panel-add-block').hasClass('ccm-panel-active')) {
					tour.end();
					setTimeout(function() {
						ConcreteHelpGuideManager.getGuide('add-content').start();
					}, 0);
					return;
				}
				ConcreteHelpGuideManager.enterToolbarGuideMode();
			},
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			}
		});
	});

})(window, jQuery);
