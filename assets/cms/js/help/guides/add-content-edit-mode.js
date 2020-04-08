/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

    var $tmp;
	ConcreteHelpGuideManager.register('add-content-edit-mode', function() {
		var i18n = ccmi18n_helpGuides['add-content-edit-mode'];
		var steps = [{
			element: '[data-guide-toolbar-action=add-content]',
			content: '<h3>' + i18n[0].title + '</h3>' + i18n[0].text,
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block',
			content: '<h3>' + i18n[1].title + '</h3>' + i18n[1].text,
			placement: 'right',
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block .ccm-panel-header-accordion',
			content: '<h3>' + i18n[2].title + '</h3>' + i18n[2].text,
			placement: 'right',
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block input[data-input=search-blocks]',
			content: '<h3>' + i18n[3].title + '</h3>' + i18n[3].text,
			placement: 'right',
			preventInteraction: true,
		},{
			element: '#ccm-panel-add-block .ccm-panel-add-block-draggable-block-type:first>*:first',
			content: '<h3>' + i18n[4].title + '</h3>' + i18n[4].text,
			placement: 'right',
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
            onShown: ConcreteHelpGuideManager.updateStepFooter,
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			}
		});
	});

})(window, jQuery);
