/* eslint-disable eqeqeq */
/* global ccmi18n_editor */
CKEDITOR.plugins.add('concreteinline', {

    init: function (editor) {
        // Save plugin is for replace mode only.
        if (editor.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) { return }

        editor.addCommand('c5save', {
            exec: function (editor) {
                $('#' + editor.element.$.id + '_content').val(editor.getData())
                ConcreteEvent.fire('EditModeBlockSaveInline')
                editor.destroy()
            }
        })

        editor.addCommand('c5cancel', {
            exec: function (editor) {
                if (editor.checkDirty()) {
                    ConcreteAlert.confirm(ccmi18n_editor.cancelPrompt, function () {
                        $.fn.dialog.closeTop()
                        ConcreteEvent.fire('EditModeExitInline')
                        editor.destroy()
                    }, 'btn-danger', ccmi18n_editor.cancelPromptButton)
                } else {
                    ConcreteEvent.fire('EditModeExitInline')
                    editor.destroy()
                }
            }
        })

        if (editor.ui.addButton) {
            editor.ui.addButton('concrete_save', {
                label: editor.lang.common.ok,
                command: 'c5save',
                toolbar: 'document,0'
            })
            editor.ui.addButton('concrete_cancel', {
                label: editor.lang.common.cancel,
                command: 'c5cancel',
                toolbar: 'document,1'
            })
        }
    }
})
