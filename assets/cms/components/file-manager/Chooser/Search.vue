<template>
    <div>
        <div class="form-inline mt-3">
            <div class="form-group ml-auto">
                <label class="mr-2">Search</label>
                <input class="form-control" v-model="keyword" />
            </div>
        </div>
        <div v-show="!keyword" class="text-center mt-5">
            <span class="search-icon my-4">
                <Icon icon="search" type="fas" color="#f4f4f4"/>
            </span>
            <p><b>Let's get some info on what you're looking for.</b></p>
        </div>
        <div>
            <files v-if="this.keyword"
                :selectedFiles.sync="selectedFiles"
                :resultsFormFactor="this.$props.resultsFormFactor"
                :routePath="this.routePath + this.keyword"/>
        </div>
    </div>
</template>

<script>
import Icon from '../../Icon'
import Files from '../Chooser/Files'

export default {
    components: {
        Icon,
        Files
    },
    data: () => ({
        keyword: '',
        selectedFiles: [],
        routePath: '/ccm/system/file/chooser/search/'
    }),
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid' // grid | list
        }
    },
    watch: {
        selectedFiles: function(value) {
            this.$emit('update:selectedFiles', value)
        }
    },
}
</script>

<style lang="scss" scoped>
.search-icon {
    display: inline-block;
    .icon {
        font-size:7rem;
    }
}
</style>