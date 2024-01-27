<template>
    <flyout-menu :label="styleValue.style.name" @save="componentUpdated">
        <template v-slot:icon>
            T
        </template>
        <template v-slot:content>
            <div class="mb-2">
                <label class="form-label">{{ i18n.fontFamily }}</label>
                <div class="d-flex">
                    <font-family-page-customizer-widget @update="componentUpdated" v-if="fontFamilySubTypeValue" :style-value="fontFamilySubTypeValue"></font-family-page-customizer-widget>
                    <div class="ms-1 d-flex align-items-center" v-if="colorSubTypeValue">
                        <color-page-customizer-widget @update="componentUpdated" :style-value="colorSubTypeValue"></color-page-customizer-widget>
                    </div>
                </div>
            </div>
            <div class="mb-2" v-if="fontSizeSubTypeValue">
                <label class="form-label">{{ i18n.fontSize }}</label>
                <size-page-customizer-widget @update="componentUpdated" :style-value="fontSizeSubTypeValue"></size-page-customizer-widget>
            </div>
            <div class="mb-2" v-if="fontWeightSubTypeValue">
                <label class="form-label">{{ i18n.fontWeight }}</label>
                <font-weight-page-customizer-widget @update="componentUpdated" :style-value="fontWeightSubTypeValue"></font-weight-page-customizer-widget>
            </div>
            <div class="mb-2" v-if="fontStyleSubTypeValue">
                <label class="form-label">{{ i18n.fontStyle }}</label>
                <font-style-page-customizer-widget @update="componentUpdated" :style-value="fontStyleSubTypeValue"></font-style-page-customizer-widget>
            </div>
            <div class="mb-2" v-if="textDecorationSubTypeValue">
                <label class="form-label">{{ i18n.textDecoration }}</label>
                <text-decoration-page-customizer-widget @update="componentUpdated" :style-value="textDecorationSubTypeValue"></text-decoration-page-customizer-widget>
            </div>
            <div class="mb-2" v-if="textTransformSubTypeValue">
                <label class="form-label">{{ i18n.textTransform }}</label>
                <text-transform-page-customizer-widget @update="componentUpdated" :style-value="textTransformSubTypeValue"></text-transform-page-customizer-widget>
            </div>
        </template>
    </flyout-menu>
</template>

<script>
import ColorPageCustomizerWidget from './ColorPageCustomizerWidget.vue'
import FontFamilyPageCustomizerWidget from './FontFamilyPageCustomizerWidget.vue'
import SizePageCustomizerWidget from './SizePageCustomizerWidget.vue'
import FontWeightPageCustomizerWidget from './FontWeightPageCustomizerWidget.vue'
import FontStylePageCustomizerWidget from './FontStylePageCustomizerWidget.vue'
import TextTransformPageCustomizerWidget from './TextTransformPageCustomizerWidget.vue'
import TextDecorationPageCustomizerWidget from './TextDecorationPageCustomizerWidget.vue'
import FlyoutMenu from './flyout/FlyoutMenu.vue'

export default {
    components: {
        FlyoutMenu,
        ColorPageCustomizerWidget,
        FontFamilyPageCustomizerWidget,
        SizePageCustomizerWidget,
        FontWeightPageCustomizerWidget,
        FontStylePageCustomizerWidget,
        TextTransformPageCustomizerWidget,
        TextDecorationPageCustomizerWidget
    },
    data() {
        return {
            i18n: {
                fontFamily: 'Font Family',
                fontSize: 'Size',
                fontWeight: 'Font Weight',
                fontStyle: 'Font Style',
                textDecoration: 'Text Decoration',
                textTransform: 'Text Transform'
            },
            fontFamilySubTypeValue: null,
            colorSubTypeValue: null,
            fontSizeSubTypeValue: null,
            fontWeightSubTypeValue: null,
            fontStyleSubTypeValue: null,
            textDecorationSubTypeValue: null,
            textTransformSubTypeValue: null
        }
    },
    methods: {
        componentUpdated: function (data) {
            this.$emit('update', data)
        }
    },
    mounted() {
        var my = this
        if (window.ccmi18n_styleCustomizer) {
            for (const key in my.i18n) {
                if (window.ccmi18n_styleCustomizer[key]) {
                    my.i18n[key] = window.ccmi18n_styleCustomizer[key]
                }
            }
        }
        this.styleValue.value.values.forEach(function(styleValue) {
            console.log(styleValue)
            if (styleValue.style.type === 'color') {
                my.colorSubTypeValue = styleValue
            }
            if (styleValue.style.type === 'font_family') {
                my.fontFamilySubTypeValue = styleValue
            }
            if (styleValue.style.type === 'size') {
                my.fontSizeSubTypeValue = styleValue
            }
            if (styleValue.style.type === 'font_weight') {
                my.fontWeightSubTypeValue = styleValue
            }
            if (styleValue.style.type === 'font_style') {
                my.fontStyleSubTypeValue = styleValue
            }
            if (styleValue.style.type === 'text_decoration') {
                my.textDecorationSubTypeValue = styleValue
            }
            if (styleValue.style.type === 'text_transform') {
                my.textTransformSubTypeValue = styleValue
            }
        })
    },
    computed: {},
    props: {
        styleValue: {
            type: Object
        }
    }
}
</script>
