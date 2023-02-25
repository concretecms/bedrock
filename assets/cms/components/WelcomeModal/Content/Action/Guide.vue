<template>
    <div>
        <a href="#" @click="launchGuide">
            <i class="fas fa-cog"></i>
            Run Guide
        </a>
    </div>
</template>

<script>
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
            var tour = ConcreteHelpGuideManager.getGuide(this.guide);

            const welcomeModal = document.getElementById('concrete-welcome-modal');
            const modal = bootstrap.Modal.getOrCreateInstance(welcomeModal);
            if (modal) {
                modal.hide()
            }

            tour.start();
        }
    },
    mounted() {

    }
}
</script>
