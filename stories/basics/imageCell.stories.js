import ImageCell from '../../assets/cms/components/ImageCell'

export default {
    title: 'Basics/ImageCell',
    component: ImageCell
}

export const basicUsage = () => ({
    components: {
        ImageCell
    },
    template: `
    <div class="ccm-ui">
        <ImageCell src="https://via.placeholder.com/200" file-size="104 KB" size="200"/>
    </div>
    `
})
