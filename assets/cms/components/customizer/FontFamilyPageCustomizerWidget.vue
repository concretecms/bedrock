<template>
    <select @change="componentUpdated" v-model="selectedFont">
        <option value="__default__" data-font="">Default</option>
        <optgroup label="Theme Fonts">
            <option v-for="font in customFonts" :data-font="font" :value="font">{{ font }}</option>
        </optgroup>
        <optgroup label="Standard Fonts">
            <option v-for="font in standardFonts" :data-font="font" :value="font">{{ font }}</option>
        </optgroup>
    </select>
</template>

<script>
/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* globals TomSelect, WebFont */
export default {
    components: {},
    data() {
        return {
            selectedFont: this.styleValue.value.fontFamily
        }
    },
    mounted() {
        new TomSelect(this.$el, {
            render: {
                option: function (data, escape) {
                    return `<div style="font-family: ${data.font}">${data.text}</div>`
                },
                item: function (item, escape) {
                    return `<div style="font-family: ${item.font}">${item.text}</div>`
                }
            }
        })
        var googleFontFamilies = []
        this.styleValue.style.fonts.forEach(function(font) {
            if (font.type === 'google') {
                googleFontFamilies.push(font.name)
            }
        })
        if (WebFont && googleFontFamilies.length) {
            WebFont.load({
                google: {
                    families: googleFontFamilies
                }
            })
        }
    },
    methods: {
        componentUpdated: function () {
            var componentUpdatedFontFamily = this.selectedFont
            if (this.selectedFont == '__default__') {
                // This is a TomSelect limitation. we want to send an empty string but when
                // I put an empty string in my value the option doesn't get added to the list.
                componentUpdatedFontFamily = ''
            }
            this.$emit('update', {
                variable: this.styleValue.style.variable,
                value: {
                    fontFamily: componentUpdatedFontFamily
                }
            })
        }
    },
    computed: {
        customFonts: function() {
            var fonts = []
            var my = this
            this.styleValue.style.fonts.forEach(function(font) {
                fonts.push(font.name)
            })
            if (fonts.indexOf(my.selectedFont) === -1 && my.standardFonts.indexOf(my.selectedFont) === -1) {
                fonts.push(my.selectedFont)
            }
            return fonts
        },
        standardFonts: function () {
            return [
                'Helvetica',
                'Arial',
                'Arial Black',
                'Verdana',
                'Tahoma',
                'Trebuchet MS',
                'Impact',
                'Times New Roman',
                'Didot',
                'Georgia',
                'Garamond',
                'American Typewriter',
                'Andale Mono',
                'Courier New',
                'Lucida Console',
                'Monaco',
                'Brush Script MT'
            ]
        }
    },
    props: {
        styleValue: {
            type: Object
        }
    }
}
</script>
