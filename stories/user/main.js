import { action } from '@storybook/addon-actions'
import _ from 'underscore'

/**
 * @TODO Get the styles working for this component
 */

window.CCM_DISPATCHER_FILENAME = ''
window._ = _

window.ConcreteAjaxRequest = function(data) {
    action('ConcreteAjaxRequest')(data)
    data.success({
        data: [
            { id: 1, name: 'foo', email: 'foo@example.com', dateAdded: 'date added', status: 'cool', totalLogins: 1337 }
        ]
    })
}
