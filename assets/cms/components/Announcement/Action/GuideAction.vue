<template>
    <div>
        <a href="#" @click.prevent="launchGuide">
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
            const announcementModal = $(this.$el).closest('.modal')
            const modal = bootstrap.Modal.getOrCreateInstance(announcementModal.get(0))
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
