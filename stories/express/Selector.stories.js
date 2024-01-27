import Selector from "../../assets/cms/components/express/Selector.vue";
import {action} from "@storybook/addon-actions";

/**
 * @TODO Make this work as expected
 */

window.CCM_DISPATCHER_FILENAME = ''
window.ConcreteAjaxRequest = action('ConcreteAjaxRequest')

export default {
    component: Selector,
    title: 'Express/Selector'
}

export const basicUsage = {
    args: {
        entityId: 'foo'
    }
}