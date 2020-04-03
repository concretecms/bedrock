/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

	ConcreteHelpGuideManager.register('change-content', function() {
		var i18n = ccmi18n_helpGuides['change-content'];
		var steps = [{
			element: '[data-guide-toolbar-action=edit-page]',
			title: i18n[0].title,
			content: i18n[0].text,
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
				ConcreteHelpGuideManager.enterToolbarGuideMode();
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
				if (global.CCM_EDIT_MODE) {
					tour.end();
					setTimeout(function() {
						ConcreteHelpGuideManager.getGuide('change-content-edit-mode').start();
					}, 0);
				} else {
					ConcreteHelpGuideManager.launchGuideOnRefresh('change-content-edit-mode');
				}
			},
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
			},
		});
	});

})(window, jQuery);
