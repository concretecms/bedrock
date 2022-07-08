<template>
    <div class="input-group">
        <input
            class="form-control"
            autocomplete="off"
            value=""
            :name="name"
            :id="name"
            :type="inputType"
        />
        <button v-if="toggler" type="button" class="input-group-icon" @click="toggle()">
            <i :class="`fas fa-${iconName}`" aria-hidden="true"></i>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            passwordVisible: false,
            inputType: 'password',
            iconName: 'eye'
        }
    },
    props: {
        name: {
            type: String
        },
        toggler: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        toggle() {
            this.passwordVisible = !this.passwordVisible

            if (this.passwordVisible === true) {
                this.inputType = 'text'
                this.iconName = 'eye-slash'
            } else {
                this.inputType = 'password'
                this.iconName = 'eye'
            }
        }
    }
}
</script>
