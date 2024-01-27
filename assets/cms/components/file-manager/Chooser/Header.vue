<template>
    <div class="row">
        <div class="mb-3">
            <header class="hstack align-items-start gap-3">
                <div class="me-auto">
                    <h5>{{title}}</h5>
                    <breadcrumb v-if="breadcrumbItems" :breadcrumb-items="breadcrumbItems" @itemClick="onBreadcrumbItemClick" />
                </div>
                <form @submit.prevent="search" v-if="enableSearch">
                    <div class="ccm-header-search-form-input input-group input-group-sm">
                        <input type="text" class="form-control border-end-0" :placeholder="i18n.search"
                               autocomplete="false" v-model="searchText">
                        <button type="submit" class="input-group-icon">
                            <svg width="16" height="16">
                                <use xlink:href="#icon-search"/>
                            </svg>
                        </button>
                    </div>
                </form>
                <button type="button" @click="toggleFormFactor" v-if="showFormFactorSelector"
                        class="btn btn-sm btn-secondary">
                    <i v-if="resultsFormFactor === 'grid'" class="fas fa-th"></i>
                    <i v-if="resultsFormFactor === 'list'" class="fas fa-list"></i>
                </button>
            </header>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '../../Breadcrumb.vue'

export default {
    components: {
        Breadcrumb
    },
    props: {
        title: {
            type: String,
            required: true
        },
        showFormFactorSelector: {
            type: Boolean,
            required: false,
            default: true
        },
        enableSearch: {
            type: Boolean,
            required: false,
            default: false
        },
        resultsSearchQuery: {
            type: String
        },
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid',
            validator: value => ['grid', 'list'].indexOf(value) !== -1
        },
        breadcrumbItems: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            i18n: {
                search: 'Search'
            },
            searchText: ''
        }
    },
    watch: {
        resultsSearchQuery(value) {
            this.searchText = value
        }
    },
    methods: {
        search() {
            const my = this
            my.$emit('update:resultsSearchQuery', my.searchText)
        },
        toggleFormFactor() {
            const my = this
            if (this.resultsFormFactor === 'grid') {
                my.$emit('update:resultsFormFactor', 'list')
            } else {
                my.$emit('update:resultsFormFactor', 'grid')
            }
        },
        onBreadcrumbItemClick(item) {
            this.$emit('breadcrumbItemClick', item)
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
    }
}
</script>
