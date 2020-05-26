<template>
    <header>
        <button type="button" @click="toggleFormFactor" v-if="showFormFactorSelector"
                class="btn btn-sm float-right btn-secondary">
            <i v-if="resultsFormFactor === 'grid'" class="fas fa-th"></i>
            <i v-if="resultsFormFactor === 'list'" class="fas fa-list"></i>
        </button>
        <h5>{{title}}</h5>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        showFormFactorSelector: {
            type: Boolean,
            required: false,
            default: true
        },
        resultsFormFactor: {
            type: String,
            required: false,
            default: 'grid' // grid | list
        }
    },
    methods: {
        toggleFormFactor() {
            var my = this
            if (this.resultsFormFactor === 'grid') {
                my.$emit('update:resultsFormFactor', 'list')
            } else {
                my.$emit('update:resultsFormFactor', 'grid')
            }
        }
    }
}
</script>
