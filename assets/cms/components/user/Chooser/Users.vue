<template>
    <div>
        <svg v-if="isLoading" class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg>
        <div v-if="!isLoading">
            <table class="table ccm-image-chooser-list-view">
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th># Logins</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user.id + 'list'">
                        <td><input v-model="selectedUsers" :type="multipleSelection ? 'checkbox' : 'radio'" :id="'user-' + user.id" :value="user.id"></td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.dateAdded}}</td>
                        <td>{{user.status}}</td>
                        <td>{{user.totalLogins}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
export default {
    data() {
        return {
            isLoading: true,
            userList: [],
            selectedUsers: []
        }
    },
    props: {
        routePath: {
            type: String,
            required: true
        },
        multipleSelection: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getUsers() {
            const my = this
            my.isLoading = true
            new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + this.$props.routePath,
                error: function(r) {
                    ConcreteAlert.dialog(ccmi18n.error, ConcreteAjaxRequest.errorResponseToString(r));
                },
                success: function (r) {
                    if (r.data.length) {
                        my.userList = r.data
                    }

                    my.isLoading = false
                }
            })
        }
    },
    watch: {
        selectedUsers: function(value) {
            if (!Array.isArray(value)) {
                value = [value];
            }

            this.$emit('update:selectedUsers', value)
        },
        routePath: function() {
            this.getUsers()
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>
