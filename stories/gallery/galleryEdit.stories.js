import GalleryEdit from '../../assets/cms/components/gallery/GalleryEdit'

import Vue from 'vue'

Vue.component('GalleryEdit', GalleryEdit)

export default {
    title: 'Gallery/Gallery Edit',
    component: GalleryEdit
}

const galleryData = [
    {
        id: 1,
        title: 'Newspaper Man',
        description: 'A picture of a man holding a newspaper.',
        extension: 'jpg',
        attributes: {},
        fileSize: '140 kb',
        imageUrl: 'https://images.pexels.com/photos/4348556/pexels-photo-4348556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/4348556/pexels-photo-4348556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 2,
        title: 'Woman in the valley',
        description: 'A picture of a woman posing at the canyon.',
        extension: 'jpg',
        attributes: {},
        fileSize: '340 kb',
        imageUrl: 'https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 3,
        title: 'Woman Watching her phone',
        description: 'A picture of a woman in her bed watching her smartphone.',
        extension: 'jpg',
        attributes: {},
        fileSize: '220 kb',
        imageUrl: 'https://images.pexels.com/photos/3060643/pexels-photo-3060643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/3060643/pexels-photo-3060643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 6,
        title: 'Landscape Montecarlo',
        description: 'A picture Montecarlo desert in Italy',
        extension: 'jpg',
        attributes: {},
        fileSize: '399 kb',
        imageUrl: 'https://images.pexels.com/photos/1606327/pexels-photo-1606327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/1606327/pexels-photo-1606327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 7,
        title: 'Woods',
        description: 'A picture of beatuful Oregon forest landscape.',
        extension: 'jpg',
        attributes: {},
        fileSize: '323 kb',
        imageUrl: 'https://images.pexels.com/photos/2791056/pexels-photo-2791056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/2791056/pexels-photo-2791056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 8,
        title: 'Mount Hood',
        description: 'A picture beatiful Mount Hood in Oregon',
        extension: 'jpg',
        attributes: {},
        fileSize: '291 kb',
        imageUrl: 'https://images.pexels.com/photos/2539427/pexels-photo-2539427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/2539427/pexels-photo-2539427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 9,
        title: 'Gray Mountain Peak',
        description: 'A picture Gray Mountain Peak in Argentina',
        extension: 'jpg',
        attributes: {},
        fileSize: '339 kb',
        imageUrl: 'https://images.pexels.com/photos/991422/pexels-photo-991422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/991422/pexels-photo-991422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    },
    {
        id: 10,
        title: 'Snow-capped Mountain',
        description: 'A picture beautiful snow-capped mountain in the Himalayas',
        extension: 'jpg',
        attributes: {},
        fileSize: '289 kb',
        imageUrl: 'https://images.pexels.com/photos/3363359/pexels-photo-3363359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        thumbUrl: 'https://images.pexels.com/photos/3363359/pexels-photo-3363359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
]

export const basicUsage = () => ({
    components: {
        GalleryEdit,
        ...GalleryEdit.components
    },
    data: () => ({
        gallery: galleryData
    }),
    template: `
    <div class="ccm-ui" style="width:800px;">
        <GalleryEdit :gallery="gallery"/>
    </div>
    `
})
