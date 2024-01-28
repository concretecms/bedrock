// See docs for CSF files https://storybook.js.org/docs/api/csf
import { ref } from 'vue'
import IconButton, { types as buttonTypes } from '../assets/cms/components/IconButton.vue'
import { icons, types } from '../assets/cms/components/iconlist'
import { action } from '@storybook/addon-actions'
import { rest } from 'msw'

// Use `ref` to make a dynamic value like you would with a `script setup` component
const clicks = ref(0)

// Set up the default options for all stories in this file
export default {
    components: { IconButton },
    title: 'Parent Directory/Subdirectory',
    component: IconButton,
    tags: ['autodocs'], // Add the 'autodocs' tag in order to generate a `Docs` page automatically,
    argTypes: { // Use argtypes to change how Controls are rendered in storybook
        type: {
            options: buttonTypes,
            control: 'inline-radio'
        },
        iconType: {
            options: types,
            control: 'select'
        },
        labelPosition: {
            options: ['left', 'right'],
            control: 'radio'
        }
    },
    decorators: [ // Use decorators to wrap the component in elements / functionality
        () => ({
            setup: () => ({ clicks }), // https://vuejs.org/api/composition-api-setup
            template: `
                <div class="text-center border d-inline-block p-3 bg-dark bg-gradient text-white border-dark">
                    <div>Clicked <em>{{clicks}}</em> times</div>
                    <story/>
                </div>`
        })
    ]
}

// Export the simplest usage story called "Basic Usage"
export const basicUsage = {
    args: { // Properties of `args` get passed as props/attributes for our component
        icon: icons.fas.tractor,
        iconType: types.fas,
        onClick: () => clicks.value++
    }
}

// Use `render` to override how the component renders
export const customRender = {
    args: {
        icon: icons.fas.tractor,
        iconType: types.fas,
        class: 'btn-sm',
        style: 'font-size: .5rem',
        onClick: action('click') // Use `action` to expose events and similar to the storybook frontend. https://storybook.js.org/docs/essentials/actions
    },
    render: args => ({
        components: { IconButton },
        setup: () => ({ args }),
        template: '<IconButton v-bind="args">Useful if there\'s a slot filled</IconButton>'
    })
}

// Example to show off MSW request mocking
const result = ref(null)
export const restTriggeringExample = {
    args: { // Properties of `args` get passed as props/attributes for our component
        icon: icons.fab.internetExplorer,
        iconType: types.fab,
        onClick: async () => {
            clicks.value++
            // Send a fetch request on click
            const response = await fetch('/the-path')
            result.value = (await response.json()).result
        }
    },
    decorators: [
        () => ({
            setup: () => ({ result }),
            template: 'Got "{{result}}"<br><story/>'
        })
    ],
    parameters: {
        msw: [ // Use MSW to mock fetch / XMLHttpRequest
            rest.get('/the-path', function (req, res, ctx) {
                return res(ctx.json({
                    result: 'Mock Worked 👍 ' + Math.floor(Math.random() * 50)
                }))
            })
        ]
    }
}
