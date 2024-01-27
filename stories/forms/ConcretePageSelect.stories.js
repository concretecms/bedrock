import ConcretePageSelect from "../../assets/cms/components/form/ConcretePageSelect.vue";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import TomSelect from "tom-select";
import {action} from "@storybook/addon-actions";
import {rest} from "msw";

window.TomSelect = TomSelect
window.CCM_DISPATCHER_FILENAME = ''


const mockProducts = [
    {"id":270,"primary_label":"Products"},
    {"id":271,"primary_label":"Some other page"},
    {"id":272,"primary_label":"A quick brown fox jumps over the lazy dog"},
]
export default {
    title: 'Forms/ConcretePageSelect',
    component: ConcretePageSelect,
    parameters: {
        msw: {
            handlers: [
                rest.post('/ccm/system/page/autocomplete/get_selected', (req, res, ctx) => {
                    return res(ctx.json(mockProducts.slice(0, 1)))
                }),
                rest.post('/ccm/system/page/autocomplete', (req, res, ctx) => {
                    const response = res(ctx.json(mockProducts))
                    response.status = 500
                    return response
                })
            ]
        }
    }
}

export const defaultUsage = {
    args: {
        accessToken: 'foo',
        inputName: 'page-select',
        onChange: action('change')
    }
}

export const selectedPage = {
    args: {
        accessToken: 'foo',
        inputName: 'page-select',
        pageId: 2,
        onChange: action('change')
    }
}
