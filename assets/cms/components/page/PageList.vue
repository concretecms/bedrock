<template>
    <div>
        <svg v-if="isLoading" class="ccm-loader-dots">
            <use xlink:href="#icon-loader-circles"/>
        </svg>
        <table v-else class="table ccm-page-list-view">
            <thead>
            <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Date</th>
                <th>Last Modified</th>
                <th>Author</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="page in pageList" :key="page.cID + 'list'" @click="choosePage(page)">
                <td>{{page.type}}</td>
                <td>{{page.name}}</td>
                <td>{{page.datePublic}}</td>
                <td>{{page.dateModified}}</td>
                <td>{{page.author}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/**
 * @vue-data {false|Array<Object>} pageList - pages to display. When not yet initialised this is set to false.
 * @vue-prop {String} routePath - Origin for pageList data which is fetched by ConcreteAjaxRequest
 */
export default {
    data: () => ({
        pageList: false
    }),
    props: {
        routePath: {
            type: String,
            required: true
        }
    },
    computed: {
        isLoading () {
            return this.pageList === false
        }
    },
    methods: {
        /**
          * Retrieves pages from the routePath url. On success this updates
          * this.pageList. That triggers Vue to rerender search result
          * @returns ConcreteAjaxRequest - The request that performs the fetch and updates this.pageList
          */
        fetchPages () {
            return new ConcreteAjaxRequest({
                url: CCM_DISPATCHER_FILENAME + this.$props.routePath,
                success: response => {
                    if (response.data.length) {
                        this.pageList = response.data
                    }
                }
            })
        },

        /**
         * After clicking signal the parent component a click took place on
         * a page row and send the cID of the clicked page.
         * @param {Object} page - Page object with all of the properties that the list has available
         */
        choosePage (page) {
            this.$emit('click', page)
        }
    },
    watch: {
        routePath: () => {
            this.fetchPages()
        }
    },
    mounted () {
        this.fetchPages()
    }
}
</script>
