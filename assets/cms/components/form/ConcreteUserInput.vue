<template>
    <div class="ccm-item-selector-group">
        <input type="hidden" :name="inputName" :value="selectedUserID" v-if="inputName !== ''" />

        <div v-if="isLoading">
            <div class="btn-group">
                <div class="btn btn-secondary"><svg class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg></div>
                <button type="button" @click="reset" class="ccm-item-selector-reset btn btn-secondary">
                    <i class="fa fa-times-circle"></i>
                </button>
            </div>
        </div>

        <div class="ccm-item-selector-choose" v-else-if="!selectedUser">
            <button type="button" @click="openChooser" class="btn btn-secondary">
                {{chooseText}}
            </button>
        </div>

        <div class="ccm-item-selector-loaded" v-else="selectedUser !== null">
            <div class="btn-group">
                <div class="btn btn-secondary">
                    <span v-html="selectedUser.avatar"></span>
                    <span class="ccm-item-selector-title">{{selectedUser.displayName}}</span>
                </div>
                <button type="button" @click="reset" class="ccm-item-selector-reset btn btn-secondary">
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
            isLoading: false,
            selectedUser: null /* json object */,
            selectedUserID: 0 /* integer */
        }
    },
    props: {
        inputName: {
            type: String,
            default: ''
        },
        userId: {
            type: Number,
            default: 0
        },
        chooseText: {
            type: String,
            default: 'Choose a User'
        }
    },
    watch: {
        selectedUserID: {
            immediate: true,
            handler(value) {
                if (value > 0) {
                    this.loadUser(value)
                } else {
                    this.selectedUser = null
                }
                this.$emit('change', value)
            }
        }
    },
    mounted() {
        if (this.userId) {
            this.selectedUserID = this.userId
        }
    },
    methods: {
        chooseFile: function(selectedUsers) {
            this.selectedUserID = selectedUsers[0]
        },
        openChooser: function() {
            window.ConcreteUserManager.launchDialog((r) => {
                this.loadUser(r.id)
            })
        },
        loadUser(userId) {
            this.isLoading = true
            window.ConcreteUserManager.getUserDetails(userId, (r) => {
                this.isLoading = false
                this.selectedUser = r.users[0]
                this.selectedUserID = userId
            })
        },
        reset() {
            this.isLoading = false
            this.selectedUserID = null
        }
    }
}
</script>
