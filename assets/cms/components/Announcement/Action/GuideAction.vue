<template>
    <div>
        <a href="#" @click="launchGuide">
            <i class="fas fa-cog"></i>
            Run Guide
        </a>
    </div>
</template>

<script>
/* global ConcreteHelpGuideManager bootstrap */
export default {
    props: {
        guide: {
            type: String,
            required: true
        }
    },
    data: () => ({
    }),
    methods: {
        launchGuide() {
            var tour = ConcreteHelpGuideManager.getGuide(this.guide)
            const announcementModal = document.getElementById('concrete-announcement-modal')
            const modal = bootstrap.Modal.getOrCreateInstance(announcementModal)
            if (modal) {
                modal.hide()
            }
            tour.start()
        }
    },
    mounted() {

    }
}
</script>
