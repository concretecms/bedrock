/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour, ConcreteEvent */

;(function(global, $) {

	ConcreteHelpGuideManager.register('add-content', function() {
		var i18n = ccmi18n_helpGuides['add-content'];
		var steps = [{
			element: '[data-guide-toolbar-action=add-content]',
			title: i18n[0].title,
			content: i18n[0].text,
		}];
		var tourRunning = false;
		var tour = new Tour({
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
				ConcreteHelpGuideManager.launchGuideOnRefresh('add-content-edit-mode');
				$("#tourBackdrop").detach(); // https://github.com/IGreatlyDislikeJavascript/bootstrap-tourist/issues/42
				tourRunning = true;
			},
			onEnd: function() {
				ConcreteHelpGuideManager.exitToolbarGuideMode();
				tourRunning = false;
			},
		});
		ConcreteEvent.subscribe('PanelOpen', function(e, data) {
			if (tourRunning && data.panel.options.identifier === 'add-block') {
				tour.end();
				setTimeout(function() {
					ConcreteHelpGuideManager.getGuide('add-content-edit-mode').start();
				}, 0);
			}
		});

		return tour;
	});


})(window, jQuery);
