<template>
    <div>
        <search
            :selectedUsers.sync="selectedUsers"
            :multiple-selection="multipleSelection"
            :hide-username="hideUsername"
        />
        <div class="dialog-buttons">
            <button class="btn btn-secondary" data-dialog-action="cancel">{{ i18n.cancel }}</button>
            <button type="button" @click="chooseUsers" :disabled="selectedUsers.length === 0" class="btn btn-primary">{{ i18n.choose }}</button>
        </div>
    </div>
</template>

<script>
import Users from './Chooser/Users'
import Search from './Chooser/Search'

export default {
    components: {
        Users,
        Search
    },
    props: {
        multipleSelection: {
            type: Boolean,
            default: true
        },
        hideUsername: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            i18n: {
                cancel: 'Cancel',
                choose: 'Choose'
            },
            selectedUsers: []
        }
    },
    methods: {
        chooseUsers() {
            window.ConcreteEvent.publish('UserSearchDialogSelectUser.core', { users: this.selectedUsers })
        }
    },
    mounted() {
        if (window.ccmi18n_users) {
            for (const key in this.i18n) {
                if (window.ccmi18n_users[key]) {
                    this.i18n[key] = window.ccmi18n_users[key]
                }
            }
        }
    }
}
</script>
