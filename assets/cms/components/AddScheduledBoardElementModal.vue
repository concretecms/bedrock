<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-add-scheduled-board-element">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent="submit">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Scheduled Board Content</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="control-label form-label" for="element">Element</label>
                            <select :class='{"form-control": true, "is-invalid": invalidSelectedElement}' id="element"
                                    v-model="scheduleBoardSelectedElement">
                                <option value="0">** Choose Element</option>
                                <option v-for="element in elements" :value="element.id">{{ element.name }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">From</label>
                            <div class="row mb-3">
                                <div class="col-6">
                                    <input type="date" v-model="startDate"
                                           :class="{'form-control': true, 'is-invalid': invalidStartDate}">
                                </div>
                                <div class="col-6">
                                    <input type="time" class="form-control" v-model="startTime">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">To</label>
                            <div class="row">
                                <div class="col-6">
                                    <input type="date" v-model="endDate"
                                           :class="{'form-control': true, 'is-invalid': invalidEndDate}">
                                </div>
                                <div class="col-6">
                                    <input type="time" class="form-control" v-model="endTime">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-6">
                                    <label for="timezone" class="form-label">Time Zone</label>
                                    <select class="form-select" v-model="scheduleBoardTimezone" id="timezone">
                                        <option v-for="(timezone, timezoneID) in timezones" :value="timezoneID">
                                            {{ timezone }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label class="control-label form-label" for="chooseSlot">Slot</label>
                                    <select class="form-select" id="chooseSlot" v-model="scheduleBoardBoardSlot">
                                        <option v-for="currentSlot in totalSlots" :value="currentSlot">
                                            {{ currentSlot }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Curation</label>
                            <div class="form-check">
                                <input class="form-check-input" id="lockType1" type="radio" v-model="lockType"
                                       value="L">
                                <label class="form-check-label" for="lockType1">
                                    Lock stripe – only admins can change.
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="lockType2" v-model="lockType"
                                       value="U">
                                <label class="form-check-label" for="lockType2">
                                    Share stripe – editors can remove.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary me-auto" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">{{ submitButtonText }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        scheduleBoardElementAction: {
            type: String,
            required: true,
        },
        selectedInstanceIds: {
            type: Array,
            required: false,
            value: function() {
                return []
            }
        },
        scheduleBoardElementToken: {
            type: String,
            required: true,
        },
        totalSlots: {
            type: Number,
            required: false,
            default: 1
        },
        boardSlot: {
            type: Number,
            required: false,
            default: 1
        },
        timezone: {
            type: String,
            required: true,
        },
        timezones: {
            type: Object,
            required: true,
        },
        selectedElement: {
            type: Number,
            required: false,
            default: null
        },
        elements: {
            type: Array,
            required: true
        },
        submitButtonText: {
            type: String,
            required: false,
            default: 'Publish'
        }
    },
    data: () => ({
        scheduleBoardSelectedElement: '',
        invalidSelectedElement: false,
        invalidStartDate: false,
        invalidEndDate: false,
        startDate: '',
        endDate: '',
        startTime: '00:00',
        endTime: '23:59',
        scheduleBoardTimezone: '',
        scheduleBoardBoardSlot: 0,
        lockType: 'L',
    }),
    methods: {
        submit() {
            let my = this
            let valid = true
            if (!this.startDateFormatted) {
                this.invalidStartDate = true
            } else {
                this.invalidStartDate = false
            }
            if (!this.endDateFormatted) {
                this.invalidEndDate = true
            } else {
                this.invalidEndDate = false
            }
            if (this.scheduleBoardSelectedElement < 1) {
                this.invalidSelectedElement = true
            } else {
                this.invalidSelectedElement = false
            }
            if (this.invalidStartDate || this.invalidEndDate || this.invalidSelectedElement) {
                valid = false
            }
            if (valid) {
                new ConcreteAjaxRequest({
                    url: my.scheduleBoardElementAction,
                    method: 'POST',
                    data: {
                        ccm_token: my.scheduleBoardElementToken,
                        elementId: this.scheduleBoardSelectedElement,
                        slot: this.slot,
                        startDate: this.startDateFormatted,
                        endDate: this.endDateFormatted,
                        startTime: this.startTime,
                        endTime: this.endTime,
                        lockType: this.lockType,
                        timezone: this.timezone,
                        instances: this.selectedInstanceIds
                    },
                    success: function (r) {
                        window.location.reload()
                    }
                })
            }
        }
    },
    computed: {
        startDateFormatted() {
            if (this.startDate) {
                return moment(this.startDate).format("YYYY-MM-DD")
            }
            return null
        },
        endDateFormatted() {
            if (this.endDate) {
                return moment(this.endDate).format("YYYY-MM-DD")
            }
            return null
        },
    },
    mounted() {
        this.scheduleBoardSelectedElement = this.selectedElement
        this.scheduleBoardTimezone = this.timezone
        this.scheduleBoardBoardSlot = this.boardSlot
    }
}
</script>
