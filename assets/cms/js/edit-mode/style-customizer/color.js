/* eslint-disable no-new, no-unused-vars, camelcase */

function ConcreteStyleCustomizerColorPicker($element, options) {
    var my = this
    my.$element = $element
    const defaulti18n = window.ccmi18n_styleCustomizer || null
    my.options = $.extend(true, {
        initialColor: '',
        i18n: {
            cancel: defaulti18n && defaulti18n.cancel ? defaulti18n.cancel : 'Cancel',
            choose: defaulti18n && defaulti18n.choose ? defaulti18n.choose : 'Choose',
            clear: defaulti18n && defaulti18n.clearColorSelection ? defaulti18n.clearColorSelection : 'Clear Color Selection',
            noColorSelected: defaulti18n && defaulti18n.noColorSelected ? defaulti18n.noColorSelected : 'No Color Selected',
            togglePaletteMore: defaulti18n && defaulti18n.togglePaletteMore ? defaulti18n.togglePaletteMore : 'More',
            togglePaletteLess: defaulti18n && defaulti18n.togglePaletteLess ? defaulti18n.togglePaletteLess : 'Less'
        }
    }, options || {})
    $element.spectrum({
        showInput: true,
        showInitial: true,
        preferredFormat: 'rgb',
        allowEmpty: true,
        className: 'ccm-widget-colorpicker',
        showAlpha: true,
        value: my.options.initialColor,
        cancelText: my.options.i18n.cancel,
        chooseText: my.options.i18n.choose,
        clearText: my.options.i18n.clear,
        noColorSelectedText: my.options.i18n.noColorSelected,
        togglePaletteMoreText: my.options.i18n.togglePaletteMore,
        togglePaletteLessText: my.options.i18n.togglePaletteLess,
        change: function() {
            ConcreteEvent.publish('StyleCustomizerControlUpdate')
        }
    })
    $element.addClass('ccm-style-customizer-importexport').data('ccm-style-customizer-importexport', this)
}

ConcreteStyleCustomizerColorPicker.prototype = {
    exportStyle: function (data, cb) {
        var my = this
        var varName = my.$element.attr('name') || ''
        var match = varName.match(/^(.+)\[color\]$/)
        if (!match) {
            cb()
            return
        }
        var value = my.$element.spectrum('get')
        if (!(match[1] in data)) {
            data[match[1]] = {}
        }
        data[match[1]].color = value ? value.toHex8String() : ''
        cb()
    },
    importStyle: function (data, cb) {
        var my = this
        var varName = my.$element.attr('name') || ''
        var match = varName.match(/^(.+)\[color\]$/)
        if (!match) {
            cb()
            return
        }
        if (data[match[1]] && typeof data[match[1]].color === 'string') {
            my.$element.spectrum('set', data[match[1]].color)
        }
        cb()
    }
}

// jQuery Plugin
$.fn.concreteStyleCustomizerColorPicker = function(options) {
    return $.each($(this), function(i, obj) {
        new ConcreteStyleCustomizerColorPicker($(this), options)
    })
}

global.ConcreteStyleCustomizerColorPicker = ConcreteStyleCustomizerColorPicker
