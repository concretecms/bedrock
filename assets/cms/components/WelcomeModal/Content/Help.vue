<template>
    <div class="modal-content">
        <concrete-welcome-header title="Take a few minutes to learn the basics"></concrete-welcome-header>
        <div class="modal-body">
            <div class="offset-lg-3 col-lg-9">
                <span v-html="body"></span>
            </div>
        </div>
        <div class="modal-footer d-flex">
            <button class="btn btn-primary ms-auto" @click="markSlideAsViewed">Got It!</button>
        </div>
    </div>
</template>

<script>
import ConcreteWelcomeHeader from '../Header'
export default {
    components: {
        ConcreteWelcomeHeader
    },
    props: {
        body: {
            type: String,
            required: true,
        },
    },
    data: () => ({
    }),
    methods: {
        markSlideAsViewed() {
            this.$emit('mark-slide-as-viewed', 'introduction')
        }
    },
    mounted() {
        if ($.fn.magnificPopup) {
            $(this.$el).find('a[data-lightbox=iframe]').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
        $(this.$el).find('a[data-launch-guide]').on('click', function(e) {
            e.preventDefault();
            var guide = $(this).data('launch-guide'),
                tour = ConcreteHelpGuideManager.getGuide(guide);
            if (tour === undefined) {
                return;
            }
            tour.start();
        });
    }
}
</script>
