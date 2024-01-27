import ConcreteExpressEntrySelect from "../../assets/cms/components/form/ConcreteExpressEntrySelect.vue";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import ConcreteAjaxSelect from "../../assets/cms/components/form/ConcreteAjaxSelect.vue";
import {rest} from "msw";

window.TomSelect = TomSelect


const items = [
    {"id":270,"primary_label":"Products"},
    {"id":271,"primary_label":"Some other page"},
    {"id":272,"primary_label":"A quick brown fox jumped over the lazy dog."},
]

export default {
    component: ConcreteExpressEntrySelect,
    title: 'Forms/ConcreteExpressEntrySelect',
    parameters: {
        msw: [
            rest.post('/ccm/system/express/entry/autocomplete/get_selected', (req, res, ctx) => {
                return res(ctx.json(items.slice(0, 1)))
            }),
            rest.post('/ccm/system/express/entry/autocomplete', (req, res, ctx) => {
                return res(ctx.json(items))
            })
        ],
    },
}



window.CCM_DISPATCHER_FILENAME = ''
export const basicUsage = {
    args: {
        entity: 'foo',
        accessToken: '',
        inputName: '',
        entryId: 5,
    }
}