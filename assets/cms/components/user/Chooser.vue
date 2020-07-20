<template>
    <div>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-12 p-3">
                    <search :selectedUsers.sync="selectedUsers" :multiple-selection="multipleSelection"/>
                </div>
            </div>
        </div>
        <div class="dialog-buttons">
            <button class="btn btn-secondary" data-dialog-action="cancel">Cancel</button>
            <button type="button" @click="chooseUsers" :disabled="selectedUsers.length === 0" class="btn btn-primary">Choose</button>
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
        }
    },
    data() {
        return {
            selectedUsers: [],
        }
    },
    methods: {
        chooseUsers() {
            window.ConcreteEvent.publish('UserSearchDialogSelectUser.core', { uID: this.selectedUsers })
        }
    }
}
</script>
