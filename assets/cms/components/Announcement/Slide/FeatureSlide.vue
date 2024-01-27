<template>
    <div class="modal-content">
        <announcement-header :title="title"></announcement-header>
        <div class="modal-body">
            <transition-group appear name="concrete-fade" mode="out-in">
                <announcement-item
                    :key="'title' + i"
                    :class="{'mt-4': i > 0}"
                    v-for="(item, i) in items"
                    :item="item">
                </announcement-item>
            </transition-group>
        </div>
        <div class="modal-footer d-flex">
            <component v-if="button !== null" :key="button.component" :is="button.component"
                       v-bind="button.componentProps"
            ></component>
            <button v-if="hasMoreSlides" class="btn btn-primary ms-auto" @click="next">Next</button>
            <button v-else class="btn btn-primary ms-auto" @click="done">Done</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
import AnnouncementHeader from '../Header/Header.vue'
import AnnouncementItem from '../Item/Item.vue'
import ConcreteAnnouncementExternalLinkButton from '../Button/ExternalLinkButton.vue'

export default {
    components: {
        AnnouncementHeader,
        AnnouncementItem,
        ConcreteAnnouncementExternalLinkButton
    },
    props: {
        title: {
            type: String,
            required: true
        },
        button: {
            type: Object,
            required: false
        },
        items: {
            type: Array,
            required: true
        },
        currentSlideInGroup: {
            type: Number,
            required: false,
            default: 0
        },
        totalSlidesInGroup: {
            type: Number,
            required: false,
            default: 1
        }
    },
    emits: ['advance-broadcast', 'mark-announcement-as-viewed'],
    data: () => ({
        itemsToDisplay: null
    }),
    computed: {
        hasMoreSlides() {
            return (this.currentSlideInGroup + 1) < this.totalSlidesInGroup
        }
    },
    methods: {
        next() {
            this.$emit('advance-broadcast')
        },
        done() {
            this.$emit('mark-announcement-as-viewed')
            this.$emit('advance-broadcast')
        }
    },
    mounted() {

    }
}
</script>
