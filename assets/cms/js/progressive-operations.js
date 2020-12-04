/* global NProgress, ConcreteAlert */
/* eslint-disable eqeqeq */

function ConcreteProgressiveOperation(options) {
    var my = this
    options = $.extend({
        url: '',
        data: {},
        title: '',
        response: null, // If we have already performed the queueing action, as in a form, we will have a response, and no URL/data
        onComplete: null,
        onError: null,
        pollRetryTimeout: 1000,
        element: null
    }, options)
    my.options = options
    my.current = 0
    my.total = -1 // unknown
    my.pnotify = false
    my.execute()
}

ConcreteProgressiveOperation.prototype.setProgressBarStatus = function(completion, remaining) {
    var my = this
    var $remainingElement = my.options.element.find('div[data-progress-bar=remaining]')

    if (remaining > -1) {
        my.options.element.find('div.progress').removeClass('progress-striped active')
        my.options.element.find('div.progress-bar').css('width', completion + '%')

        if (!$remainingElement.length) {
            my.options.element.append('<div data-progress-bar="remaining"></div>')
            $remainingElement = my.options.element.find('div[data-progress-bar=remaining]')
        }
        $remainingElement.html(remaining + ' remaining')
    } else {
        my.options.element.find('div.progress').addClass('progress-striped active')
        my.options.element.find('div.progress-bar').css('width', '100%')
    }
}

ConcreteProgressiveOperation.prototype.updateTotals = function(processId, token, remaining) {
    var my = this
    if (my.total == -1) {
        // We haven't set the total yet.
        my.total = remaining
    }

    my.current += my.total - remaining

    if (!my.options.element) {
        NProgress.set((my.total - remaining) / my.total)
        $('div[data-wrapper=progressive-operation-status]').html(remaining + ' remaining')
    } else {
        var completion = ((my.total - remaining) / my.total) * 100
        my.setProgressBarStatus(completion, remaining)
    }
}

ConcreteProgressiveOperation.prototype.completeOperation = function() {
    var my = this
    if (my.options.element) {
        my.setProgressBarStatus(100, 0)
    } else {
        NProgress.done()
        my.pnotify.close()
    }
    if (typeof (my.options.onComplete) === 'function') {
        my.options.onComplete(r)
    }
}

ConcreteProgressiveOperation.prototype.poll = function(processId, token, remaining) {
    var my = this

    my.updateTotals(processId, token, remaining)

    var url = CCM_DISPATCHER_FILENAME + '/ccm/system/process/monitor/' + processId + '/' + token

    $.concreteAjax({
        loader: false,
        url: url,
        type: 'POST',
        dataType: 'json',
        success: function(r) {
            var remaining = r.process.batch.pendingJobs
            if (remaining > 0) {
                setTimeout(function() {
                    my.poll(processId, token, remaining)
                }, my.options.pollRetryTimeout)
            } else {
                setTimeout(function() {
                    my.completeOperation()
                }, 1000)
            }
        }
    })
}

ConcreteProgressiveOperation.prototype.showStatus = function() {
    var my = this
    if (!my.options.element) {
        my.pnotify = ConcreteAlert.notify({
            message: '<div data-wrapper="progressive-operation-status">' + ccmi18n.progressiveOperationLoading + '</div>',
            hide: false,
            title: my.options.title,
            closer: false,
            type: 'info',
            icon: 'sync-alt fa-spin'
        })
    }
}

ConcreteProgressiveOperation.prototype.initProgressBar = function() {
    var my = this
    var $wrapper = my.options.element
    var title = my.options.title
    var html = '<h4>' + title + '</h4>' +
            '<div class="progress progress-striped active">' +
            '<div class="progress-bar" style="width: 0%;"></div>' +
            '</div>'
    if ($wrapper.find('div.progress-bar').length < 1) {
        $wrapper.append(html)
    }
}

ConcreteProgressiveOperation.prototype.execute = function() {
    var my = this
    if (my.options.element && my.options.element.length) {
        my.initProgressBar()
        my.setProgressBarStatus(0, -1)
    } else {
        NProgress.set(0)
    }

    if (my.options.response) {
        // We have already performed the submit as part of another operation,
        // like a concrete5 ajax form submission
        // todo, make work again.
        //var remaining = my.options.response.total - my.options.response.completed
        //my.startOperation(my.options.response.process.id, my.options.response.token, remaining)
    } else {
        $.concreteAjax({
            loader: false,
            url: my.options.url,
            type: 'POST',
            data: my.options.data,
            dataType: 'json',
            success: function(r) {
                my.showStatus()
                if (my.options.requiresPolling) {
                    my.poll(r.process.id, r.token, r.process.batch)
                } else {
                    my.updateTotals(r.process.id, r.token, r.process.batch.pendingJobs)
                    const url = new URL(r.eventSource)
                    url.searchParams.append('topic', 'https://global.concretecms.com/batches/' + r.process.batch.id)
                    const eventSource = new EventSource(url)
                    eventSource.onmessage = event => {
                        var data = JSON.parse(event.data)
                        var remaining = data.batch.pendingJobs
                        if (remaining > 0) {
                            my.updateTotals(r.process.id, r.token, remaining)
                        } else {
                            my.completeOperation()
                        }
                    }
                }
            }
        })
    }
}

global.ConcreteProgressiveOperation = ConcreteProgressiveOperation
