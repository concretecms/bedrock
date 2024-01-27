import AvatarCropper from '../../assets/account/js/frontend/components/AvatarCropper.vue'
import { rest } from 'msw'
import { ref } from 'vue'

const result = ref(null)
// Set up the values for all stories in this file
export default {
    title: 'Account/AvatarCropper',
    component: AvatarCropper,
    decorators: [
        () => ({
            setup: () => ({ result }),
            template: '<div style=\'margin: 0 auto;width: 500px\'><story/><div v-if="result"><h5 class="mt-3">Result:</h5><img :src="result" /></div></div>'
        })
    ],
    parameters: {
        msw: [
            rest.post('/mock-upload', function(req, res, ctx) {
                return res(ctx.json({}))
            })
        ]
    }
}

// Simplest usage with default sizing from the core
export const basicUsage = {
    args: {
        width: 150,
        height: 150,
        uploadUrl: '/mock-upload',
        src: 'https://via.placeholder.com/150',
        accessToken: '',
        lang: { header: 'Provided Header', reset: 'Provided Reset', upload: 'Provided Upload', save: 'Provided Save', saveInProgress: 'Provided SaveInProgress' },
        reloadOnSave: false,
        onSave: (data) => {
            result.value = (window.URL || window.webkitURL).createObjectURL(data)
        }
    }
}

// An example of a different form factor being used
export const differentSizes = {
    args: {
        width: 400,
        height: 300,
        uploadUrl: '/mock-upload',
        src: 'https://via.placeholder.com/400x300',
        lang: { header: 'Provided Header', reset: 'Provided Reset', upload: 'Provided Upload', save: 'Provided Save', saveInProgress: 'Provided SaveInProgress' },
        reloadOnSave: false,
        onSave: (data) => {
            result.value = (window.URL || window.webkitURL).createObjectURL(data)
        }
    }
}
