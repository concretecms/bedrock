<template>
    <div>
        <a :href="url" ref="link">
            <i class="fas fa-play-circle"></i>
            Watch Video
        </a>
    </div>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true
        }
    },
    data: () => ({
    }),
    mounted() {
        $(this.$refs.link).magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        })
    }
}
</script>
