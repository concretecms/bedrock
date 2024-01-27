<template>
    <div class="ccm-page-chooser-search-view">
        <div class="row mb-3">
            <div class="col-md-4 ms-auto">
                <form @submit.prevent="search">
                    <div class="ccm-header-search-form-input input-group">
                        <input type="text" class="form-control border-end-0" :placeholder="i18n.search" autocomplete="false" v-model="searchText">
                        <button type="submit" class="input-group-icon">
                            <svg width="16" height="16">
                                <use xlink:href="#icon-search"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div v-show="!keywords" class="text-center mt-5">
            <span class="search-icon my-4">
                <Icon icon="search" type="fas" color="#f4f4f4"/>
            </span>
            <p><b>{{ i18n.initialPageSearchChooserTip }}</b></p>
        </div>
        <div v-if="keywords">
            <PageList
                :keywords="keywords"
                :routePath="routePath"
                @click="page => choosePage(page)"/>

        </div>
    </div>
</template>

<script>
import Icon from '../../Icon.vue'
import PageList from './../PageList.vue'

export default {
    components: { Icon, PageList },
    emits: ['select'],
    data: () => ({
        i18n: {
            search: 'Search',
            initialPageSearchChooserTip: "Let's get some info on what you're looking for."
        },
        searchText: '',
        keywords: '',
        routePath: '/ccm/system/page/chooser/search/'
    }),
    methods: {
        search () {
            this.keywords = this.searchText
        },
        choosePage (page) {
            window.ConcreteEvent?.publish('SitemapSelectPage', {
                instance: this,
                cID: page.cID,
                title: page.name
            })

            this.$emit('select', page)
        }
    },
    mounted() {
        if (window.ccmi18n_sitemap) {
            for (const key in this.i18n) {
                if (window.ccmi18n_sitemap[key]) {
                    this.i18n[key] = window.ccmi18n_sitemap[key]
                }
            }
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
