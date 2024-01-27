import RunningProcessList from "../../assets/cms/components/RunningProcessList.vue";
import {action} from "@storybook/addon-actions";

let progress = 0
window.ConcreteAjaxRequest = function(data) {
    action('ConcreteAjaxRequest')(data)
    if (data.url === '/ccm/system/processes/get_configuration') {
        data.success({
            requiresPolling: false,
            pollingToken: ''
        })
    }
}
window.CCM_SECURITY_TOKEN = ''
window.CCM_DISPATCHER_FILENAME = ''

export default {
    component: RunningProcessList,
    title: 'Basics/RunningProcessList',
}

export const basicUsage = {
    args: {
        processes: [
            {
                id: 1,
                name: 'Process',
                batch: {totalJobs: 9, pendingJobs: 6},
                details: ['foo', 'baz'],
                progress: 25
            },
            {
                id: 2,
                name: 'Another one',
                batch: {totalJobs: 10, pendingJobs: 5},
                details: ['foo', 'baz'],
                progress: 33
            }
        ]
    },
}