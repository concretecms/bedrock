<template>
    <div class="modal-content">
        <announcement-header title="Take a few minutes to learn the basics"></announcement-header>
        <div class="modal-body">
            <transition appear name="concrete-fade" mode="out-in">
                <div key="loading" v-if="!Array.isArray(itemsToDisplay)">
                    <div class="placeholder-wave">
                        <section>
                            <span class="placeholder col-4 bg-black"></span>
                            <span class="placeholder col-10 bg-secondary"></span>
                            <span class="placeholder col-3 bg-primary"></span>
                        </section>
                        <section class="mt-4">
                            <span class="placeholder col-4 bg-black"></span>
                            <span class="placeholder col-10 bg-secondary"></span>
                            <span class="placeholder col-3 bg-primary"></span>
                        </section>
                        <section class="mt-4">
                            <span class="placeholder col-4 bg-black"></span>
                            <span class="placeholder col-10 bg-secondary"></span>
                            <span class="placeholder col-3 bg-primary"></span>
                        </section>
                    </div>
                </div>
                <div v-else key="items">
                    <announcement-item
                        :key="i"
                        :class="{'mt-4': i > 0}"
                        v-for="(item, i) in itemsToDisplay"
                        :item="item">
                    </announcement-item>
                </div>
            </transition>
        </div>
        <div class="modal-footer d-flex">
            <button class="btn btn-primary ms-auto" @click="confirm">Got It!</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
import AnnouncementHeader from '../Header/Header.vue'
import AnnouncementItem from '../Item/Item.vue'

export default {
    components: {
        AnnouncementHeader,
        AnnouncementItem
    },
    props: {
        items: {
            type: Array,
            required: false
        },
        itemAccessToken: {
            type: String,
            required: true
        }
    },
    emits: ['mark-announcement-as-viewed', 'advance-broadcast'],
    data: () => ({
        itemsToDisplay: null
    }),
    methods: {
        confirm() {
            this.$emit('mark-announcement-as-viewed')
            this.$emit('advance-broadcast')
        }
    },
    mounted() {
        var my = this
        if (my.items) {
            this.itemsToDisplay = my.items
        } else {
            new ConcreteAjaxRequest({
                url: `${CCM_DISPATCHER_FILENAME}/ccm/system/dialogs/help/get_items`,
                data: {
                    ccm_token: my.itemAccessToken
                },
                success: r => {
                    my.itemsToDisplay = r
                }
            })
        }
    }
}
</script>
