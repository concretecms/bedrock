import ImageCell from '../../assets/cms/components/gallery/ImageCell.vue'
import {action} from "@storybook/addon-actions";

export default {
    title: 'Gallery/Image Cell',
    component: ImageCell,
}

export const basicUsage = {
    args: {
        src: 'https://via.placeholder.com/120',
        fileSize: '104 KB',
        size: '120',
        onClick: action('click'),
        onDelete: action('delete'),
    }
}

export const basicUsage2 = () => ({
    components: {
        ImageCell,
        ...ImageCell.components
    },
    data: () => ({
        clicks: 0,
        clickDelete: 0
    }),
    template: `
    <div class="ccm-ui">
        <p>Clicks: {{clicks}}</p>
        <p>Click Delete: {{clickDelete}}</p>
        <ImageCell src="https://via.placeholder.com/120" file-size="104 KB" size="120" @click="clicks++" @delete="clickDelete++"/>
    </div>
    `
})

export const activeState2 = () => ({
    components: {
        ImageCell,
        ...ImageCell.components
    },
    template: `
    <div class="ccm-ui">
        <ImageCell src="https://via.placeholder.com/120" file-size="104 KB" size="120" isActive @click="clicks++" @delete="clickDelete++"/>
    </div>
    `
})
