import ImageDetail from '../../assets/cms/components/gallery/ImageDetail'

export default {
    title: 'Gallery/Image Detail',
    component: ImageDetail
}

const imageData = {
    id: 1,
    title: 'Man Jumping',
    description: 'A picture of a man jumping up and down, this is a longer decription of the title above.',
    extension: 'jpg',
    attributes: {},
    fileSize: '140 kb',
    imageUrl: 'https://via.placeholder.com/356x230',
    thumbUrl: 'https://via.placeholder.com/100',
    detailUrl: 'https://www.google.com/',
    displayChoices: {
        'gallery-specific-options': {
            value: '',
            title: 'Gallery Specific Options',
            type: 'text'
        },
        size: {
            value: '0',
            title: 'Size',
            type: 'select',
            options: {
                square: 'Square Image',
                default: 'Keep Image Aspect Ratio'
            }
        }
    }
}

export const basicUsage = () => ({
    components: {
        ImageDetail,
        ...ImageDetail.components
    },
    data: () => ({
        clickDelete: 0,
        image: imageData
    }),
    template: `
    <div class="ccm-ui" style="display:flex;">
        <div style="width:800px; flex:1;">
            <p>Click Delete: {{clickDelete}}</p>
            <ImageDetail @delete="clickDelete++" :image="image"/>
        </div>
        <div style="flex:1; background-color:#f4f4f4; padding:10px; margin:10px;">
            <pre>{{JSON.stringify(image, null, 2)}}</pre>
        </div>
    </div>
    `
})
