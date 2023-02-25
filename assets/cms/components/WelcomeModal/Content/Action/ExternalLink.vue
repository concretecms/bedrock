<template>
    <div>
        <a target="_blank" :href="url">
            <i class="fas fa-external-link-alt"></i>
            Learn More
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
    methods: {
    },
    mounted() {
    }
}
</script>
