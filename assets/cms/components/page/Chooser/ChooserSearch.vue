<template>
    <div>
        <div class="form-inline mt-3">
            <div class="form-group ml-auto">
                <label class="mr-2">Search</label>
                <input class="form-control" v-model="keyword"/>
            </div>
        </div>
        <div v-show="!keyword" class="text-center mt-5">
            <span class="search-icon my-4">
                <Icon icon="search" type="fas" color="#f4f4f4"/>
            </span>
            <p><b>Let's get some info on what you're looking for.</b></p>
        </div>
        <div>
            <PageList v-if="this.keyword"
                      :routePath="this.routePath + this.keyword"
                      @click="page => choosePage(page)"/>
        </div>
    </div>
</template>

<script>
import Icon from '../../Icon'
import PageList from './../PageList'

export default {
    components: { PageList, Icon },
    data: () => ({
        keyword: '',
        routePath: '/ccm/system/page/chooser/search/'
    }),
    methods: {
        choosePage (page) {
            window.ConcreteEvent.publish('SitemapSelectPage', {
                instance: this,
                cID: page.cID,
                title: page.name
            })
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
