<template>
    <div>
        <div class="p-2">
            <div class="row">
                <div class="col-md-4">
                    <h5>{{ i18n.name }}</h5>
                </div>
                <div class="col-md-3">
                    <h5>{{ i18n.dateStarted }}</h5>
                </div>
                <div class="col-md-5">
                    <h5>{{ i18n.dateCompleted }}</h5>
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
                            <span v-if="detailsAction != '' && process.hasDetails" class="d-inline-block" style="width: 20px;">
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
                        <span v-else class="text-muted">{{ i18n.loading }}</span>
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
                                <h5 class="modal-title">{{ i18n.deleteProcess }}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" :aria-label="i18n.close"></button>
                            </div>
                            <div class="modal-body">
                                {{ i18n.confirmDeletion }}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ i18n.close }}</button>
                                <button type="submit" class="btn btn-danger">{{ i18n.delete }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint eqeqeq: 0 */
import Icon from './Icon'
export default {
    components: {
        Icon
    },
    props: {
        deleteAction: {
            type: String,
            required: false,
            default: ''
        },
        detailsAction: {
            type: String,
            required: false,
            default: ''
        },
        processes: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        i18n: {
            name: 'Name',
            dateStarted: 'Date Started',
            dateCompleted: 'Date Completed',
            loading: 'Loading...',
            deleteProcess: 'Delete Process',
            confirmDeletion: 'Delete this process log entry? The record of the process along with any logs will be removed.',
            close: 'Close',
            delete: 'Delete'
        },
        openProcesses: []
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
                    processId: process.id
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
                    processId: processId
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
    mounted() {
        if (window.ccmi18n_processes) {
            for (const key in this.i18n) {
                if (window.ccmi18n_processes[key]) {
                    this.i18n[key] = window.ccmi18n_processes[key]
                }
            }
        }
    }
}
</script>
