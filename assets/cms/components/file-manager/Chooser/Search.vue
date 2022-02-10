<template>
    <div>
        <chooser-header :resultsFormFactor.sync="formFactor"
                        :resultsSearchQuery.sync="searchQuery"
                        :enable-search="true"
                        :title="title"/>

        <div v-show="!keywords" class="text-center mt-5">
            <span class="search-icon my-4">
                <Icon icon="search" type="fas" color="#f4f4f4"/>
            </span>
            <p><b>{{ i18n.initialSearchChooserTip }}</b></p>
        </div>
        <div>
            <files v-if="keywords"
                   :selectedFiles.sync="selectedFiles"
                   :resultsFormFactor="formFactor"
                   :routePath="routePath + keywords"
                   :enable-pagination="true"
                   :enable-sort="true"
                   :filters="filters"
                   :multipleSelection="multipleSelection"/>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
import Icon from '../../Icon'
import ChooserHeader from './Header'
import Files from '../Chooser/Files'

export default {
    components: {
        Icon,
        ChooserHeader,
        Files
    },
    data: () => ({
        i18n: {
            initialSearchChooserTip: "Let's get some info on what you're looking for."
        },
        keywords: '',
        selectedFiles: [],
        routePath: '/ccm/system/file/chooser/search/',
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
        resultsSearchQuery: {
            type: String
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
    methods: {
        search() {
            this.keywords = this.searchText
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
            this.keywords = value
        }
    },
    mounted() {
        if (window.ccmi18n_filemanager) {
            for (const key in this.i18n) {
                if (window.ccmi18n_filemanager[key]) {
                    this.i18n[key] = window.ccmi18n_filemanager[key]
                }
            }
        }
        this.formFactor = this.resultsFormFactor
        this.searchQuery = this.resultsSearchQuery
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
