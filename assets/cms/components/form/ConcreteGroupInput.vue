<template>
    <div class="ccm-item-selector-group">
        <input type="hidden" :name="inputName" :value="selectedGroup ? selectedGroup.gID : ''" v-if="inputName !== ''" />

        <div v-if="isLoading">
            <div class="btn-group">
                <div class="btn btn-secondary"><svg class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg></div>
                <button type="button" @click="reset" :disabled="readonly" class="ccm-item-selector-reset btn btn-secondary">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>

        <div v-else-if="selectedGroup === null" class="ccm-item-selector-choose">
            <button type="button" @click="openChooser" :disabled="readonly" class="btn btn-secondary">
                {{chooseText}}
            </button>
        </div>

        <div v-else class="ccm-item-selector-loaded">
            <div class="btn-group">
                <div class="btn btn-secondary" :class="{disabled: readonly}" @click="openChooser">
                    <span class="ccm-item-selector-title" v-bind:title="`ID: ${selectedGroup.gID}`">{{selectedGroup.gDisplayName}}</span>
                </div>
                <button type="button" @click="reset" :disabled="readonly" class="ccm-item-selector-reset btn btn-secondary">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isLoadingGroupId: 0 /* integer */,
            selectedGroup: null, /* json object */
            mounted: false
        }
    },
    computed: {
        isLoading() {
            return this.isLoadingGroupId !== 0
        }
    },
    props: {
        inputName: {
            type: String,
            default: ''
        },
        groupId: {
            type: Number,
            default: 0
        },
        chooseText: {
            type: String,
            default: 'Choose a Group'
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        groupId: {
            immediate: true,
            handler(value) {
                if (this.mounted) {
                    this.loadGroup()
                }
            }
        }
    },
    beforeMount() {
        this.mounted = true
    },
    mounted() {
        this.loadGroup(true)
    },
    beforeMount() {
        this.mounted = false
    },
    methods: {
        setSelectedGroup(group, triggerChange) {
            const currentlySelectedGroupID = this.selectedGroup?.gID || 0
            const newlySelectedGroupID = group?.gID || 0
            this.isLoadingGroupId = 0
            this.selectedGroup = group
            if (triggerChange && currentlySelectedGroupID != newlySelectedGroupID) {
                this.$emit('change', this.selectedGroup)
            }
        },
        openChooser: function() {
            window.ConcreteUserGroupManager.launchDialog((group) => {
                this.setSelectedGroup(group, true)
            })
        },
        loadGroup(initial) {
            const wantedGroupId = Math.max(parseInt(this.groupId) || 0)
            if (wantedGroupId === 0) {
                this.setSelectedGroup(null, !initial)
                return
            }
            const currentGroupId = this.selectedGroup?.gID || 0
            if (wantedGroupId == currentGroupId) {
                this.isLoadingGroupId = 0
                return
            }
            this.isLoadingGroupId = wantedGroupId
            window.ConcreteUserGroupManager.getGroupDetails(
                wantedGroupId,
                (r) => {
                    if (this.isLoadingGroupId !== wantedGroupId) {
                        return
                    }
                    this.setSelectedGroup(r.groups[0], !initial)
                    
                },
                (r) => {
                    if (this.isLoadingGroupId !== wantedGroupId) {
                        return
                    }
                    this.setSelectedGroup(null, !initial)
                    window.ConcreteAlert.dialog(ccmi18n.error, ConcreteAjaxRequest.renderJsonError(r, true))
                }
            )
        },
        reset() {
            this.setSelectedGroup(null, true)
        }
    }
}
</script>
