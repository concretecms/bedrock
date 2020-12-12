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

            <div v-if="deleteAction != ''" class="modal fade" tabindex="-1" role="dialog" :id="'delete-process-' + process.id">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <form method="post" :action="deleteAction">
                            <div class="modal-header">
                                <h5 class="modal-title">Delete Process</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <svg><use xlink:href="#icon-dialog-close" /></svg>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" name="processId" :value="process.id">
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
            default: false,
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
        'openProcesses': []
    }),
    mounted() {
        if (this.eventSource) {
            const url = new URL(this.eventSource)
            const my = this
            url.searchParams.append('topic', 'https://global.concretecms.com/task/processes/{processId}')
            const eventSource = new EventSource(url)
            eventSource.onmessage = event => {
                var data = JSON.parse(event.data)
                if (data.processId) {
                    my.processes.forEach(function(process) {
                        if (process.id === data.processId) {
                            process.details.push(data.message)
                        }
                    })
                }
            }
        }
    },
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
        }
    },
    watch: {
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

</style>
