<template>
    <div>
        <svg v-if="isLoading" class="ccm-loader-dots"><use xlink:href="#icon-loader-circles" /></svg>
        <div v-if="!isLoading">
            <table class="ccm-search-results-table">
                <thead>
                    <tr>
                        <th></th>
                        <th @click="sortBy('name')" :class="getSortColumnClassName('name')"><a href="javascript:void(0)">{{ i18n.username }}</a></th>
                        <th @click="sortBy('email')" :class="getSortColumnClassName('email')"><a href="javascript:void(0)">{{ i18n.email }}</a></th>
                        <th @click="sortBy('dateAdded')" :class="getSortColumnClassName('dateAdded')"><a href="javascript:void(0)">{{ i18n.date }}</a></th>
                        <th>{{ i18n.status }}</th>
                        <th @click="sortBy('totalLogins')" :class="getSortColumnClassName('totalLogins')"><a href="javascript:void(0)">{{ i18n.numLogins }}</a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in sortedUserList" :key="user.id + 'list'">
                        <td>
                            <input type="checkbox" v-if="multipleSelection" v-model="selectedUsers" :id="'user-' + user.id" :value="user">
                            <input type="radio" v-if="!multipleSelection" v-model="selectedUsers" :id="'user-' + user.id" :value="user">
                        </td>
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
            i18n: {
                username: 'Username',
                email: 'Email',
                date: 'Date',
                status: 'Status',
                numLogins: '# Logins'
            },
            isLoading: true,
            userList: [],
            selectedUsers: [],
            sortByColumn: 'dateAdded',
            sortByDirection: 'desc'
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
                    ConcreteAlert.dialog(ccmi18n.error, ConcreteAjaxRequest.errorResponseToString(r))
                },
                success: function (r) {
                    if (r.data.length) {
                        my.userList = r.data
                    }

                    my.isLoading = false
                }
            })
        },
        sortBy(column) {
            if (column === this.sortByColumn) {
                this.sortByDirection = this.sortByDirection === 'asc' ? 'desc' : 'asc'
            }

            this.sortByColumn = column
        },
        getSortColumnClassName(column) {
            let className = ''
            if (column === this.sortByColumn) {
                className = `ccm-results-list-active-sort-${this.sortByDirection}`
            }

            return className
        }
    },
    computed: {
        sortedUserList() {
            const sorted = _.sortBy(this.userList, this.sortByColumn)

            if (this.sortByDirection === 'desc') {
                return sorted.reverse()
            }

            return sorted
        }
    },
    watch: {
        selectedUsers(value) {
            if (!Array.isArray(value)) {
                value = [value]
            }

            this.$emit('update:selectedUsers', value)
        },
        routePath() {
            this.getUsers()
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
        this.getUsers()
    }
}
</script>
