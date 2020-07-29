<template>
    <div class="ccm-ui">
        <div class="form-inline mt-3 mb-1">
            <div class="form-group ml-auto">
                <label class="mr-2">Search</label>
                <input type="search" v-model="keyword" class="form-control" autocomplete="off">
            </div>
        </div>
        <div v-show="!keyword" class="text-center mt-5">
            <span class="search-icon my-4">
                <Icon icon="search" type="fas" color="#f4f4f4"/>
            </span>
            <p><b>Let's get some info on what you're looking for.</b></p>
        </div>
        <div>
            <users v-if="this.keyword"
                :selectedUsers.sync="selectedUsers"
                :multipleSelection="multipleSelection"
                :routePath="this.routePath + this.keyword"/>
        </div>
    </div>
</template>

<script>
import Icon from '../../Icon'
import Users from '../Chooser/Users'

export default {
    components: {
        Icon,
        Users
    },
    data: () => ({
        keyword: '',
        selectedUsers: [],
        routePath: '/ccm/system/user/chooser/search/'
    }),
    props: {
        multipleSelection: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        selectedUsers: function(value) {
            this.$emit('update:selectedUsers', value)
        }
    }
}
</script>

<style lang="scss" scoped>
.search-icon {
  display: inline-block;

  .icon {
    font-size: 7rem;
  }
}
</style>
