<template>
    <div>
        <div class="row mb-3">
            <div class="col-md-4 ml-auto">
                <form @submit.prevent="search">
                    <div class="ccm-header-search-form-input input-group">
                        <input type="text" class="form-control border-right-0" placeholder="Search" autocomplete="false" v-model="searchText">
                        <div class="input-group-append">
                            <button type="submit" class="input-group-icon">
                                <svg width="16" height="16">
                                    <use xlink:href="#icon-search"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="!keywords" class="text-center mt-5">
            <span class="search-icon my-4">
                <Icon icon="search" type="fas" color="#f4f4f4"/>
            </span>
            <p><b>Let's get some info on what you're looking for.</b></p>
        </div>
        <div>
            <files v-if="keywords"
                :selectedFiles.sync="selectedFiles"
                :resultsFormFactor="this.$props.resultsFormFactor"
                :routePath="this.routePath + this.keywords"/>
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
        searchText: '',
        keywords: '',
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
    methods: {
        search () {
            this.keywords = this.searchText
        }
    },
    watch: {
        selectedFiles: function(value) {
            this.$emit('update:selectedFiles', value)
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
