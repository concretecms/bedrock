<template>
    <div class="row gx-5 h-100">
        <div :class="{'border-end': true, 'col-md-6': hasSidebarSlot, 'col-md-12': !hasSidebarSlot}">
            <slot name="main">
                <transition-group appear name="concrete-fade" mode="out-in">
                    <announcement-item
                        :key="'help' + i"
                        :class="{'mt-4': i > 0}"
                        v-for="(item, i) in items"
                        :indent-if-icon-empty="false"
                        :item="item">
                    </announcement-item>
                </transition-group>
            </slot>
        </div>
        <div class="col-md-6" v-if="hasSidebarSlot">
            <slot name="sidebar"></slot>
        </div>
    </div>
</template>
<script>
import AnnouncementItem from '../Announcement/Item/Item'
import ConcreteAnnouncementExternalLinkButton from '../Announcement/Button/ExternalLinkButton'
export default {
    components: {
        AnnouncementItem,
        ConcreteAnnouncementExternalLinkButton
    },
    props: {
        items: {
            type: Array,
            required: false,
            default: []
        }
    },
    data: () => ({
    }),
    computed: {
        hasSidebarSlot() {
            return !!this.$slots.sidebar
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
