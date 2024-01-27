import Header from '../../../assets/cms/components/Announcement/Header/Header.vue'

export default {
    component: Header,
    title: 'Announcement/Header/Header',
    decorators: [
        () => ({
            template: '<div class=\'bg-dark text-light\'><story/></div>'
        })
    ]
}

export const basicUsage = {
    args: {
        title: 'Provided Title'
    }
}
