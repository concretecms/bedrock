<template>
    <div class="">
        <input :id="'color-picker-' + styleValue.style.variable"/>
    </div>
</template>

<script>

export default {
    data() {
        return {
            color: this.styleValue.value
        }
    },
    mounted() {
        var my = this
        const i18n = window.ccmi18n_styleCustomizer || null
        $('#color-picker-' + this.styleValue.style.variable).spectrum({
            showAlpha: true,
            type: 'color',
            showPalette: false,
            preferredFormat: 'rgb',
            allowEmpty: true,
            color: this.color,
            showInitial: true,
            showInput: true,
            cancelText: i18n && i18n.cancel ? i18n.cancel : 'Cancel',
            chooseText: i18n && i18n.choose ? i18n.choose : 'Choose',
            clearText: i18n && i18n.clearColorSelection ? i18n.clearColorSelection : 'Clear Color Selection',
            noColorSelectedText: i18n && i18n.noColorSelected ? i18n.noColorSelected : 'No Color Selected',
            togglePaletteMoreText: i18n && i18n.togglePaletteMore ? i18n.togglePaletteMore : 'More',
            togglePaletteLessText: i18n && i18n.togglePaletteLess ? i18n.togglePaletteLess : 'Less',
            change: function (r) {
                let newValue = null
                if (r) {
                    const color = r.toRgb()
                    newValue = {
                        r: color.r,
                        g: color.g,
                        b: color.b,
                        a: color.a
                    }
                }

                my.$emit('update', {
                    variable: my.styleValue.style.variable,
                    value: newValue
                })
            }
        })
    },
    props: {
        styleValue: {
            type: Object
        }
    }
}
</script>
