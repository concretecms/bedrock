<template>
  <div class="password-widget">
    <div class="input-group">
      <input
        class="form-control"
        autocomplete="off"
        value=""
        :name="name"
        :id="name"
        :type="inputType"
        v-model="enteredPassword"
      />
      <button
        v-if="toggler"
        type="button"
        class="input-group-icon"
        @click="passwordVisible = !passwordVisible"
      >
        <i aria-hidden="true" class="fas" :class="iconClasses"></i>
      </button>
    </div>

    <div v-if="strengthMeter" class="d-flex align-items-center mt-2 password-strength-meter">
      <div
        class="flex-grow-1 rounded h-100 me-2 bg-light"
        :class="strength.id >= 0 ? 'active' : ''"
      ></div>
      <div
        class="flex-grow-1 rounded h-100 me-2 bg-light"
        :class="strength.id >= 1 ? 'active' : ''"
      ></div>
      <div
        class="flex-grow-1 rounded h-100 me-2 bg-light"
        :class="strength.id >= 2 ? 'active' : ''"
      ></div>
      <div
        class="flex-grow-1 rounded h-100 me-0 bg-light"
        :class="strength.id >= 3 ? 'active' : ''"
      ></div>
    </div>
  </div>
</template>

<script>
import { passwordStrength } from 'check-password-strength'

export default {
    data() {
        return {
            enteredPassword: '',
            passwordVisible: false
        }
    },
    props: {
        name: {
            type: String
        },
        toggler: {
            type: Boolean,
            default: true
        },
        strengthMeter: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        inputType() {
            return this.passwordVisible ? 'text' : 'password'
        },
        iconClasses() {
            return {
                'fa-eye': !this.passwordVisible,
                'fa-eye-slash': this.passwordVisible
            }
        },
        strength() {
            return passwordStrength(this.enteredPassword, [
                {
                    id: -1,
                    value: 'Invalid', // concretecms requirement: min 5 character
                    minDiversity: 0,
                    minLength: 0
                },
                {
                    id: 0,
                    value: 'Too weak',
                    minDiversity: 1,
                    minLength: 5
                },
                {
                    id: 1,
                    value: 'Weak',
                    minDiversity: 2,
                    minLength: 6
                },
                {
                    id: 2,
                    value: 'Medium',
                    minDiversity: 4,
                    minLength: 8
                },
                {
                    id: 3,
                    value: 'Strong',
                    minDiversity: 4,
                    minLength: 10
                }
            ])
        }
    }
}
</script>

<style scoped>
* {
  --var-active-color: #b8d935;
}

.password-strength-meter {
  height: 3px;
}

.active {
  background-color: var(--var-active-color) !important;
}
</style>
