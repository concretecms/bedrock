import AddScheduledBoardElementModal from '../../assets/cms/components/AddScheduledBoardElementModal.vue'
import moment from 'moment'
import { action } from '@storybook/addon-actions'

window.moment = moment

window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')

export default {
    component: AddScheduledBoardElementModal,
    title: 'Boards/AddScheduledBoardElementModal'
}

export const basicUsage = {
    args: {
        scheduleBoardElementAction: '',
        scheduleBoardElementToken: '',
        timezone: 'foo',
        timezones: {
            foo: 'Foo'
        },
        selectedElement: 5,
        elements: [
            { id: 5, name: 'Foo' }
        ],
        class: 'show',
        style: 'display:block'
    }
}
