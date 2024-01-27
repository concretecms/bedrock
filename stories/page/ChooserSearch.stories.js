import ChooserSearch from "../../assets/cms/components/page/Chooser/ChooserSearch.vue";
import {action} from "@storybook/addon-actions";
import './fixtures'

export default {
    title: 'Page/ChooserSearch',
    component: ChooserSearch,
}

export const basicUsage = {
    args: {
        onSelect: action('select'),
    }
}