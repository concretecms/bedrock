<template>
    <div>
        <chooser-header :resultsFormFactor.sync="formFactor"
                        :resultsSearchQuery.sync="searchQuery"
                        :title="title"/>

        <files :selectedFiles.sync="selectedFiles"
               key-prefix="recent-uploads"
               :resultsFormFactor="formFactor"
               :filters="filters"
               routePath="/ccm/system/file/chooser/recent"
               :multipleSelection="multipleSelection"/>
    </div>
</template>

<script>
/* eslint-disable no-new */
import ChooserHeader from './Header'
import Files from './Files'

export default {
    components: {
        ChooserHeader,
        Files
    },
    data: () => ({
        selectedFiles: [],
        formFactor: 'grid',
        searchQuery: ''
    }),
    props: {
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid', // grid | list
            validator: value => ['grid', 'list'].indexOf(value) !== -1
        },
        title: {
            type: String,
            required: true
        },
        multipleSelection: {
            type: Boolean,
            default: true
        },
        filters: {
            type: Array
        }
    },
    watch: {
        selectedFiles(value) {
            this.$emit('update:selectedFiles', value)
        },
        formFactor(value) {
            this.$emit('update:resultsFormFactor', value)
        },
        searchQuery(value) {
            this.$emit('update:resultsSearchQuery', value)
        }
    },
    mounted() {
        this.formFactor = this.resultsFormFactor
        this.searchQuery = this.resultsSearchQuery
    }
}
</script>
