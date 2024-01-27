import ConcreteToolbarSiteList from '../../assets/cms/components/toolbar/ConcreteToolbarSiteList.vue'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.bootstrap5.css'

window.TomSelect = TomSelect

export default {
    component: ConcreteToolbarSiteList,
    title: 'Toolbar/ConcreteToolbarSiteList'
}

export const basicUsage = {
    args: {
        token: '',
        uri: '',
        selectedSite: 5,
        sites: [
            { id: 5, name: 'foo' },
            { id: 6, name: 'baz' },
            { id: 7, name: 'bar' }
        ]
    }
}
