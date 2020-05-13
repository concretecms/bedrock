
// Import required libraries.
import _ from 'underscore'
import NProgress from 'nprogress'
import PNotify from 'pnotify/dist/es/PNotify'
import Vue from 'vue';

// JavaScript/jQuery base libraries.
import 'json5'
import 'jquery.cookie'
import 'jquery-form'

// jQuery UI components
import 'jquery-ui/ui/widgets/button'
import 'jquery-ui/ui/widgets/dialog'
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'
import 'jquery-ui/ui/widgets/sortable'
import 'jquery-ui/ui/widgets/slider'

// Core concrete5 backend
import './events'
import './asset-loader'
import './page-indexer'
import './concrete5'

// CMS UI Components
import './panels'
import './toolbar'
import './legacy-dialog'
import './alert'

// Edit Mode
import './edit-mode'

// AJAX Forms and in-page notifications
import './ajax-request/base'
import './ajax-request/form'
import './ajax-request/block'

// Progressive operations
import './progressive-operations'

// Search
import './search/base'
import './search/table'

// Tree
import './tree'
import 'jquery.fancytree/dist/modules/jquery.fancytree.glyph'
import 'jquery.fancytree/dist/modules/jquery.fancytree.persist'
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd'
import 'jquery.fancytree/dist/modules/jquery.fancytree'

// Sitemap
import './sitemap/sitemap'
import './in-context-menu'
import './sitemap/menu'
import './sitemap/search'
import './sitemap/selector'

// Users
import './users'

// Express
import './express'

// Style customizer

// In-page editable fields
// TBD

// File Manager
import './file-manager/uploader'
import './file-manager/search'

import ConcreteFileInput from '@concretecms/bedrock/assets/cms/components/form/ConcreteFileInput';
import ConcreteFileChooser from '@concretecms/bedrock/assets/cms/components/file-manager/Chooser';
Vue.component('ConcreteFileInput', ConcreteFileInput);
Vue.component('ConcreteFileChooser', ConcreteFileChooser);

// Miscellaneous UI components
import 'selectize'
import 'spectrum-colorpicker'
import 'tristate/jquery.tristate'
import 'jquery-text-counter/textcounter'
import './jquery-awesome-rating'
import './liveupdate/quicksilver'
import './liveupdate/jquery-liveupdate'

// Help
import './help/help'

// Boards
import './boards'

// Calendar component
import './calendar'

// Activate Vue for all ccm-ui spaces
var vueInstances = document.querySelectorAll('div[vue-enabled]');
vueInstances.forEach(function(element) {
    new Vue({
        el: element
    });
});

window.NProgress = NProgress
window._ = _
window.PNotify = PNotify
window.Vue = Vue;
