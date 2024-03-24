// Import required libraries.
import _ from 'underscore'
import NProgress from 'nprogress'
import PNotify from './pnotify'

// JavaScript/jQuery base libraries.
import 'json5'
import 'jquery.cookie'
import 'jquery-form'
import 'dropzone/dist/dropzone'

// jQuery UI components
import 'jquery-ui/ui/widgets/button'
import 'jquery-ui/ui/widgets/dialog'
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'
import 'jquery-ui/ui/widgets/sortable'
import 'jquery-ui/ui/widgets/slider'

// Core backend
import './events'
import './asset-loader'
import './page-indexer'
import './concrete'

// CMS UI Components
import './panels'
import './toolbar'
import './legacy-dialog'
import './modal'
import './alert'
import './page-notification'
import './select-combo-box'

// Edit Mode
import './edit-mode'

// AJAX Forms and in-page notifications
import './ajax-request/base'
import './ajax-request/form'
import './ajax-request/block'

// Progressive operations
import './processes'
import './queue-consumer'
import './progressive-operations' // legacy handler

// Search
import './search/base'
import './search/table'
import './search/field-selector'

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
import './sitemap/sitemap-selector'

// Users
import './users'

// Express
import './express'

// File Manager
import './file-manager/uploader'
import './file-manager/file-manager'

// Miscellaneous UI components
import 'spectrum-colorpicker2'
import 'tristate/jquery.tristate'
import 'jquery-text-counter/textcounter'
import './jquery-awesome-rating'
import './liveupdate/quicksilver'
import './liveupdate/jquery-liveupdate'

// Help
import './help/help'

// Calendar component
import './calendar'

// Vue components.
import components from '../components/index'
import VueManager from './vue/Manager'
import './jquery-vue'

window.NProgress = NProgress
window._ = _
window.PNotify = PNotify

// Register our core components with the vue manager
VueManager.bindToWindow(window)
Concrete.Vue.createContext('cms', components)
