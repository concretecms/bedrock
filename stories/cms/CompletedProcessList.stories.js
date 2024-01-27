import CompletedProcessList from "../../assets/cms/components/CompletedProcessList.vue";
import {action} from "@storybook/addon-actions";

export default {
    title: 'CompletedProcessList',
    component: CompletedProcessList,
}

window.ConcreteAjaxRequest = function (d) {
    action('ConcreteAjaxRequest')(d)
    setTimeout(function() {
        if (d.url === 'details') {
            d.success(['example', 'details'])
        }
    }, 500)
}

export const basicUsage = {
    args: {
        detailsAction: 'details',
        deleteAction: 'delete',
        processes: [
            {
                id: 'foo',
                name: 'foo',
                hasDetails: false,
                dateStartedString: 'Started date',
                dateCompletedString: 'Ended date',
            },
            {
                id: 'baz',
                name: 'baz',
                hasDetails: true,
                dateStartedString: 'Started date',
                dateCompletedString: 'Ended date'
            }
        ]
    }
}