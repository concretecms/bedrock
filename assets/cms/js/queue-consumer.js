/* eslint-disable no-new, no-unused-vars, camelcase, eqeqeq */

class ConcreteQueueConsumer {

    static consume(token) {
        new ConcreteAjaxRequest({
            loader: false,
            url: CCM_DISPATCHER_FILENAME + '/ccm/system/messenger/consume/',
            data: {
                'token': token
            },
            success: r => {
                if (r.messages > 0) {
                    this.consume(token)
                }
            }
        })
    }

}

global.ConcreteQueueConsumer = ConcreteQueueConsumer