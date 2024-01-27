import ThemeCustomizer from "../../assets/cms/components/customizer/ThemeCustomizer.vue";
import '../../assets/cms/js/events'
import 'spectrum-colorpicker2'
import 'spectrum-colorpicker2/dist/spectrum.css'

window.CCM_SECURITY_TOKEN = ''

export default {
    component: ThemeCustomizer,
    title: 'Customizer/ThemeCustomizer',
}

export const basicUsage = {
    args: {
        previewAction: '#preview',
        deleteAction: '#delete',
        saveSkinAction: '#saveskin',
        saveStylesAction: '#savestyles',
        createNewSkinAction: '#createnewskin',
        customCss: '',
        styleList: {
            sets: [
                {name: 'foo', styles: [{value: 'red', style:{type: 'color',name:'foo'}}]}
            ]
        },
        styles: [
        ]
    },
}