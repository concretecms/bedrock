import { initialize, mswLoader } from 'msw-storybook-addon';
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/scss/theme/main.scss'

// Bootstrap
import * as bootstrap from 'bootstrap/dist/js/bootstrap.esm';

// JQuery
import jQuery from "jquery";

window.$ = window.jquery = window.jQuery = jQuery
window.bootstrap = bootstrap

$.fn.modal = (...args) => new bootstrap.Modal(...args)

const mswOptions = {
  onUnhandledRequest({method, url}) {
    if (url.pathname.startsWith('/ccm')) {
      console.error(`Unhandled ${method} request to ${url}`)
    }
  }
}

if (window.location.host.slice(-10) === '.github.io') {
  mswOptions.serviceWorker = {
    url: '/' + window.location.pathname.split('/')[1] + '/mockServiceWorker.js'
  }
}

// Initialize MSW
initialize(mswOptions);

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    () => ({
      template: `<div class="ccm-ui"><story /></div>`,
    })
  ]
}

export default preview;
