<template>
    <div>
        <div class="p-2">
            <div class="row">
                <div class="col-md-4">
                    <h5>Name</h5>
                </div>
                <div class="col-md-3">
                    <h5>Date Started</h5>
                </div>
                <div class="col-md-5">
                    <h5>Date Completed</h5>
                </div>
            </div>
        </div>
        <transition-group tag="div" class="process-card-wrapper" name="process-card-animation">
            <div :class="{'card': true, 'card-body': true, 'process-card': true, 'process-card-expandable': detailsAction != '' && process.hasDetails}"
            v-for="process in processes" :key="process.id"
                 @click="detailsAction != '' && process.hasDetails ? toggleProcess(process) : null">
                <div class="row">
                    <div class="col-md-4">
                        <div>
                            <span v-if="detailsAction != '' && process.hasDetails" class="d-inline-block" style="width: 20px">
                                <icon :icon="openProcesses.includes(process.id) ? 'chevron-down' : 'chevron-right'"></icon>
                            </span>
                            {{process.name}}
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-muted">{{process.dateStartedString}}</div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-muted">{{process.dateCompletedString}}</div>
                    </div>
                    <div class="col-md-2 d-flex">
                        <div class="ml-auto">
                            <a v-if="deleteAction != ''" href="#" class="ccm-hover-icon" @click.stop="deleteProcess(process)">
                                <icon icon="trash"></icon>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row process-progress-wrapper" v-show="process.batch !== null && process.dateCompleted === null">
                    <div class="col-md-12">
                        <div class="mt-2 ml-4 progress process-progress">
                            <div class="progress-bar" role="progressbar" :style="'width: ' + process.progress + '%'"></div>
                        </div>
                    </div>
                </div>

                <div :id="'process-' + process.id" v-if="openProcesses.includes(process.id)">
                    <div class="pt-2 pr-4 pb-2 pl-4">
                        <div v-if="process.details">
                            <div v-for="detail in process.details">
                                {{detail}}
                            </div>
                        </div>
                        <span v-else class="text-muted">Loading...</span>
                    </div>
                </div>
            </div>
        </transition-group>
        <div v-if="deleteAction !== ''">
            <div v-for="process in processes" class="modal fade" tabindex="-1" role="dialog" :id="'delete-process-' + process.id">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <form method="post" @submit.prevent="deleteProcessSubmit(process.id)">
                            <div class="modal-header">
                                <h5 class="modal-title">Delete Process</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <svg><use xlink:href="#icon-dialog-close" /></svg>
                                </button>
                            </div>
                            <div class="modal-body">
                                Delete this process log entry? The record of the process along with any logs will be removed.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
import Icon from './Icon'
export default {
    components: {
        Icon
    },
    props: {
        eventSource: {
            type: String,
            required: false,
            default: null
        },
        currentProcessId: {
            type: String,
            required: false,
            default: ""
        },
        deleteAction: {
            type: String,
            required: false,
            default: ""
        },
        detailsAction: {
            type: String,
            required: false,
            default: ""
        },
        processes: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        'openProcesses': [],
        'subscribedProcesses': []
    }),
    methods: {
        deleteProcess(process) {
            var modalTarget = '#delete-process-' + process.id
            $(modalTarget).modal('show')
        },
        openProcess(process) {
            this.openProcesses.push(process.id)
            new ConcreteAjaxRequest({
                url: this.detailsAction,
                data: {
                    processId: process.id,
                },
                success: function (r) {
                    process.details = r
                }
            })

        },
        closeProcess(process) {
            this.openProcesses.splice(this.openProcesses.indexOf(process.id), 1)
        },
        toggleProcess(process) {
            if (!this.openProcesses.includes(process.id)) {
                this.openProcess(process)
            } else {
                this.closeProcess(process)
            }
        },
        deleteProcessSubmit(processId) {
            var my = this
            new ConcreteAjaxRequest({
                url: this.deleteAction,
                data: {
                    processId: processId,
                },
                success: function (r) {
                    var modalTarget = '#delete-process-' + processId
                    $(modalTarget).modal('hide')
                    my.processes.forEach(function(process, i) {
                        if (process.id == processId) {
                            my.closeProcess(processId)
                            my.processes.splice(i, 1)
                        }
                    })
                }
            })
        }
    },
    watch: {
        processes: {
            immediate: true,
            handler: function(processes) {
                const my = this
                if (my.eventSource) {
                    processes.forEach(function(process) {
                        if (!my.subscribedProcesses.includes(process.id)) {
                            var messageUrl = new URL(my.eventSource)
                            messageUrl.searchParams.append('topic', 'https://global.concretecms.com/task/processes/' + process.id)
                            var messageEventSource = new EventSource(messageUrl)
                            messageEventSource.onmessage = event => {
                                var data = JSON.parse(event.data)
                                if (data.processId) {
                                    my.processes.forEach(function (process) {
                                        if (process.id === data.processId) {
                                            process.details.push(data.message)
                                        }
                                    })
                                }
                            }

                            var closeUrl = new URL(my.eventSource)
                            closeUrl.searchParams.append('topic', 'https://global.concretecms.com/task/close-process/' + process.id)
                            var closeEventSource = new EventSource(closeUrl)
                            closeEventSource.onmessage = event => {
                                var data = JSON.parse(event.data)
                                my.processes.forEach(function (process) {
                                    if (process.id == data.process.id) {
                                        process.dateCompleted = data.process.dateCompleted
                                        process.dateCompletedString = data.process.dateCompletedString
                                    }
                                })
                            }

                            if (process.batch) {
                                var progressUrl = new URL(my.eventSource)
                                progressUrl.searchParams.append('topic', 'https://global.concretecms.com/batches/' + process.batch.id)
                                var progressEventSource = new EventSource(progressUrl)
                                progressEventSource.onmessage = event => {
                                    var data = JSON.parse(event.data)
                                    var total = data.batch.totalJobs
                                    var progress = total - data.batch.pendingJobs
                                    var percent = Math.round(progress / total * 100)

                                    my.processes.forEach(function (process) {
                                        if (process.batch && process.batch.id == data.batch.id) {
                                            process.progress = percent
                                        }
                                    })
                                }
                            }
                            my.subscribedProcesses.push(process.id)
                        }
                    })
                }
            }
        },
        currentProcessId: {
            immediate: true,
            handler: function(processId) {
                var my = this
                this.processes.forEach(function(process) {
                    if (process.id === processId) {
                        my.openProcess(process)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

div.process-progress {
    height: 2px;
}

div.process-card {
    margin-bottom: 1rem;
    padding: 0.75rem;
}

div.process-card-expandable {
    transition: $transition-base;
    cursor: pointer;
    &:hover {
        border: 1px solid $blue;
    }
}

.process-card-animation {
    backface-visibility: hidden;
    z-index: 1;
}

/* moving */
.process-card-animation-move {
    transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.process-card-animation-enter-active {
    transition: all 400ms ease-out;
}

/* disappearing */
.process-card-animation-leave-active {
    transition: all 200ms ease-in;
    z-index: 0;
}

/* appear at / disappear to */
.process-card-animation-enter,
.process-card-animation-leave-to {
    opacity: 0;

    div.process-progress-wrapper {
        opacity: 0;
    }
}

</style>
