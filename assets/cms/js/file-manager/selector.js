/* eslint-disable no-new, no-unused-vars, camelcase */

/* global _, ccmi18n_filemanager, CCM_IMAGE_PATH, ConcreteFileManager, ConcreteFileMenu, ConcreteEvent */

function ConcreteFileSelector($element, options) {
    var my = this
    options = $.extend({
        chooseText: ccmi18n_filemanager.chooseNew,
        inputName: 'concreteFile',
        fID: false,
        filters: []
    }, options)

    my.$element = $element
    my.options = options
    my._chooseTemplate = _.template(my.chooseTemplate)({ options: my.options })
    my._loadingTemplate = _.template(my.loadingTemplate)
    my._fileLoadedTemplate = _.template(my.fileLoadedTemplate)

    my.$element.append(my._chooseTemplate)
    my.$element.on('click', 'button[data-choose=file]', function (e) {
        e.preventDefault()
        my.chooseNewFile()
    })
    my.$element.on('click', 'button[data-reset=file]', function (e) {
        e.preventDefault()
        _.defer(function() { my.$element.html(my._chooseTemplate) })
    })

    if (my.options.fID) {
        my.loadFile(my.options.fID)
    }
}

ConcreteFileSelector.prototype = {

    chooseTemplate: '<div class="ccm-file-selector-choose">' +
        '<input type="hidden" name="<%=options.inputName%>" value="0" />' +
        '<button type="button" data-choose="file" class="btn btn-secondary">' +
        '<%=options.chooseText%></button></div>',
    loadingTemplate: '<div class="ccm-file-selector-loading"><input type="hidden" name="<%=inputName%>" value="<%=fID%>">' +
        '<div class="btn-group"><div class="btn btn-secondary">' +
        '<svg><use xlink:href="#icon-loader-circles" /></svg>' +
        '</div><button class="ccm-file-selector-reset btn btn-secondary">' +
        '<i class="fa fa-times-circle"></i></div></div>',
    fileLoadedTemplate: '<div class="ccm-file-selector-loaded"><div class="btn-group">' +
        '<a href="<%=file.urlDetail%>" target="_blank" class="btn btn-secondary">' +
        '<input type="hidden" name="<%=inputName%>" value="<%=file.fID%>" />' +
        '<%=file.resultsThumbnailImg%> <span class="ccm-file-selector-title"><%=file.title%></span></a>' +
        '<button data-reset="file" class="ccm-file-selector-reset btn btn-secondary">' +
        '<i class="fa fa-times-circle"></i></div></div>',

    chooseNewFile: function () {
        var my = this
        ConcreteFileManager.launchDialog(
            function (data) {
                my.loadFile(data.fID, function () {
                    my.$element.closest('form').trigger('change')
                })
            },
            {
                filters: my.options.filters
            }
        )
    },

    loadFile: function (fID, callback) {
        var my = this
        my.$element.html(my._loadingTemplate({ inputName: my.options.inputName, fID: fID }))
        ConcreteFileManager.getFileDetails(fID, function (r) {
            var file = r.files[0]
            my.$element.html(my._fileLoadedTemplate({ inputName: my.options.inputName, file: file }))
            if (callback) {
                callback(r)
            }
        })
    }

}

// jQuery Plugin
$.fn.concreteFileSelector = function (options) {
    return $.each($(this), function (i, obj) {
        new ConcreteFileSelector($(this), options)
    })
}

global.ConcreteFileSelector = ConcreteFileSelector
