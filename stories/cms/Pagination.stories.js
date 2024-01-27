import Pagination from "../../assets/cms/components/Pagination.vue";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Pagination',
    component: Pagination,
    argTypes: {
        totalRows: {
            control: 'number'
        },
        perPage: {
            control: 'number'
        }
    }
}

export const defaultUsage = {
    args: {
        totalRows: 50,
        perPage: 10,
        value: 3,
        onChange: action('change')
    }
}

export const infinite = {
    args: {
        mode: 'cursor',
        prevCursor: 'previous',
        nextCursor: 'next',
        totalRows: -1,
        onChange: action('change')
    }
}