<template>
    <div>
        <a target="_blank" class="btn btn-secondary" :href="url">{{ title }}</a>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}
</script>
