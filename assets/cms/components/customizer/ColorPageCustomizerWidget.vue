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
        let i18n = window.ccmi18n_styleCustomizer || null;
        $('#color-picker-' + this.styleValue.style.variable).spectrum({
            showAlpha: true,
            preferredFormat: 'rgb',
            allowEmpty: true,
            color: this.color,
            showInitial: true,
            showInput: true,
            cancelText: i18n && i18n.cancel || 'Cancel',
            chooseText: i18n && i18n.choose || 'Choose',
            clearText: i18n && i18n.clearColorSelection || 'Clear Color Selection',
            noColorSelectedText: i18n && i18n.clearColorSelection || 'No Color Selected',
            togglePaletteMoreText: i18n && i18n.togglePaletteMore || 'More',
            togglePaletteLessText: i18n && i18n.togglePaletteLess || 'Less',
            change: function (r) {
                var color = r.toRgb()
                my.$emit('update', {
                    variable: my.styleValue.style.variable,
                    value: {
                        r: color.r,
                        g: color.g,
                        b: color.b,
                        a: color.a
                    }
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
