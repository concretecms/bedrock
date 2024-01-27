import PageList from "../../assets/cms/components/page/PageList.vue";
import './fixtures'

export default {
    title: 'Page/PageList',
    component: PageList,
}

export const basicUsage = {
    args: {
        keywords: 'foo',
        routePath: '/doesnt/matter',
    }
}