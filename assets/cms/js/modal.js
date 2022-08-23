/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */
/* global bootstrap */
// This is a bridge between our various old custom code and Bootstrap Modals. The ultimate goal is to first
// Remove jQuery UI, on the way to removing jQuery (if the latter is ever an option.) So the first thing we need to
// do is remove all instances of dialog-launch legacy jQuery UI dialogs in favor of a single modal BS modal approach.

import bootbox from 'bootbox'

class ConcreteModal {
    openExternal(url, title) {
        var my = this
        new ConcreteAjaxRequest({
            url: url,
            dataType: 'html',
            success: function (r) {
                my.show({ message: r, title: title })
            }
        })
    }

    show(options) {
        options = $.extend(options, {
            className: 'ccm-ui',
            centerVertical: true,
            show: false,
            backdrop: 'static'
        })
        const $_dialog = bootbox.dialog(options)
        const element = $_dialog.get(0)

        // Turn the _dialog jQuery object into the new Bs5 modal
        const dialog = new bootstrap.Modal(element)

        // Handle buttons in the response
        const responseButtons = $_dialog.find('.dialog-buttons')
        if (responseButtons.length) {
            // move it out to the root.
            responseButtons.attr('class', 'modal-footer').insertAfter($_dialog.find('.modal-body'))
        }

        // Handle the legacy dialog buttons
        $_dialog.find('[data-dialog-form]').concreteAjaxForm()
        $_dialog.find('button[data-dialog-action=cancel]').on('click', function() {
            dialog.hide()
        })
        $_dialog.find('button[data-dialog-action=submit]').on('click', function() {
            $_dialog.find('[data-dialog-form]').submit()
        })

        // Change the Close button to be white.
        $_dialog.find('.btn-close').addClass('btn-close-white')

        // Show the dialog
        // dialog._config.backdrop = 'static'
        dialog.show()

        if (options.backdrop === 'static') {
            dialog._config.backdrop = 'static'
        }

        element.addEventListener('hide.bs.modal', function() {
            ConcreteModal.totalOpen--
        })
        ConcreteModal.totalOpen++
    }
}

ConcreteModal.totalOpen = 0

global.ConcreteModal = ConcreteModal
