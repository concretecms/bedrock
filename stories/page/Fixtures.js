import {action} from "@storybook/addon-actions";

window.CCM_DISPATCHER_FILENAME = 'foo'
window.ConcreteAjaxRequest = function(options) {
    action('ConcreteAjaxRequest')(options)

    options.success({
        meta: {
            ccm: {
                pagination_show: true,
            },
            pagination: {
                total: 1337,
                count: 1337,
                per_page: 20,
                current_page: 1,
                total_pages: 1337
            },
        },
        data: [{
            cID: 100,
            type: 'foo',
            name: 'Example',
            datePublic: 'public date',
            dateModified: 'modified date',
            author: 'author'
        }]
    })
}