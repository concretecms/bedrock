<template>
    <div class="ccm-ui">
        <div class="modal fade" data-bs-backdrop="static" role="dialog" tabindex="-1" id="concrete-announcement-modal">
            <component
                :key="announcementKey"
                :is="announcementComponent"
                :handle="announcementKey"
                :slides="announcementComponentSlides"
                :total-slides="announcementComponentSlides.length"
                @advance-broadcast="advanceBroadcast"
            ></component>
        </div>
    </div>
</template>
<script>
/* global bootstrap */
import ConcreteAnnouncementModal from './Modal/Modal'

export default {
    components: {
        ConcreteAnnouncementModal
    },
    props: {
        broadcast: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        currentAnnouncement: 0
    }),
    computed: {
        announcementKey: function() {
            return this.broadcast.announcements[this.currentAnnouncement].handle
        },
        announcementComponent: function() {
            return this.broadcast.announcements[this.currentAnnouncement].component
        },
        announcementComponentSlides: function() {
            return this.broadcast.announcements[this.currentAnnouncement].slides
        }
    },
    methods: {
        advanceBroadcast() {
            if ((this.currentAnnouncement + 1) === this.broadcast.announcements.length) {
                this.getModal().hide()
            } else {
                this.currentAnnouncement++
            }
        },
        getModal() {
            const modal = document.getElementById('concrete-announcement-modal')
            return bootstrap.Modal.getOrCreateInstance(modal)
        }
    },
    mounted() {
        var modal = this.getModal()
        if (modal) {
            modal.show()
        }
    }
}
</script>
