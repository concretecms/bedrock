/* global ccmi18n, CCM_DISPATCHER_FILENAME, ConcreteAjaxRequest, ConcreteEvent */
class ConcreteUserGroupManager {
    static launchDialog(callback, opts) {
        const options = {
            displayDialogButtons: true
        }

        $.extend(options, opts)

        $.fn.dialog.open({
            title: ccmi18n.chooseGroup,
            href: `${CCM_DISPATCHER_FILENAME}/ccm/system/dialogs/groups/search`,
            width: '740px',
            modal: true,
            height: '600px',
            data: options,
            onOpen: function() {
                ConcreteEvent.unsubscribe('SelectGroup.core')
                ConcreteEvent.subscribe('SelectGroup.core', function (e, response) {
                    $.fn.dialog.closeTop()
                    callback(response)
                })
            }
        })
    }

    static getGroupDetails(groupID, callbackSuccess, callbackFailure) {
        const options = {
            url: `${CCM_DISPATCHER_FILENAME}/ccm/system/group/get_json`,
            data: { gID: groupID },
            skipResponseValidation: true,
            success(r) {
                if (r.error) {
                    if (callbackFailure) {
                        callbackFailure(r)
                    } else {
                        ConcreteAjaxRequest.validateResponse(r)
                    }
                } else if (callbackSuccess) {
                    callbackSuccess(r)
                }
            }
        }
        if (callbackFailure) {
            options.error = function(r) {
                callbackFailure(r)
            }
        }
        /* eslint-disable no-new */
        new ConcreteAjaxRequest(options)
        /* eslint-enable no-new */
    }
}

global.ConcreteUserGroupManager = ConcreteUserGroupManager
