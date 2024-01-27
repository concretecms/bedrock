import ConcreteAjaxSelect from "../../assets/cms/components/form/ConcreteAjaxSelect.vue";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import TomSelect from "tom-select";
import {rest} from "msw";

window.TomSelect = TomSelect

const items = [
    {"id":270,"primary_label":"Products"},
    {"id":271,"primary_label":"Some other page"},
    {"id":272,"primary_label":"A quick brown fox jumped over the lazy dog."},
]

export default {
    component: ConcreteAjaxSelect,
    title: 'Forms/ConcreteAjaxSelect',
    parameters: {
        msw: [
            rest.post('/selected-option-url', (req, res, ctx) => {
                return res(ctx.json(items.slice(0, 1)))
            }),
            rest.post('/data-source-url', (req, res, ctx) => {
                return res(ctx.json(items))
            })
        ],
    },
}

export const basicUsage = {
    args: {
        dataSourceUrl: '/data-source-url',
        selectedOptionsUrl: '/selected-option-url',
        formData: {
            pageId: 1
        },
        accessToken: '',
    }
}
