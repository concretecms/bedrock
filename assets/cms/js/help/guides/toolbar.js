/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ccmi18n_tourist, ConcreteHelpGuideManager, Tour */

;(function(global, $) {

	ConcreteHelpGuideManager.register('toolbar', function() {
		var i18n = ccmi18n_helpGuides.toolbar;
		var steps = [{
		    element: '[data-guide-toolbar-action=edit-page]',
		    title: i18n[0].title,
			content: i18n[0].text,
		},{
            element: '[data-guide-toolbar-action=page-settings]',
			title: i18n[1].title,
			content: i18n[1].text,
		},{
            element: '[data-guide-toolbar-action=add-content]',
			title: i18n[2].title,
			content: i18n[2].text,
		},{
            element: '[data-guide-toolbar-action=intelligent-search]',
			title: i18n[3].title,
			content: i18n[3].content,
		},{
            element: '[data-guide-toolbar-action=sitemap]',
            title: i18n[4].title,
            content: i18n[4].content,
		},{
            element: '[data-guide-toolbar-action=dashboard]',
            title: i18n[5].title,
            content: i18n[5].content,
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
            },
            onEnd: function() {
                ConcreteHelpGuideManager.exitToolbarGuideMode();
            }
		});
	});

})(window, jQuery);
