/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

	ConcreteHelpGuideManager.register('change-content', function() {
		var i18n = ccmi18n_helpGuides['change-content'];
		var steps = [{
			content: '<p><span class="h5">' + i18n[0].title + '</span><br/>' + i18n[0].text + '</p>',
			highlightTarget: false,
			closeButton: true,
			nextButton: false,
			target: $('[data-guide-toolbar-action=edit-page]'),
			my: 'top left',
			at: 'bottom center'
		}];

		return new Tour({
			steps: steps,
			tipClass: 'Bootstrap',
			tipOptions:{
				showEffect: 'slidein'
			},
            framework: 'bootstrap4',
            onStart: function() {
                ConcreteHelpGuideManager.enterToolbarGuideMode();
                ConcreteHelpGuideManager.launchGuideOnRefresh('change-content-edit-mode');
            },
            onEnd: function() {
                ConcreteHelpGuideManager.exitToolbarGuideMode();
            },
		});
	});

})(window, jQuery);
