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

    <ul
      v-if="strengthMeter"
      class="d-flex align-items-center mt-2 password-strength-meter"
    >
      <li
        v-for="bar in bars"
        class="flex-grow-1 rounded h-100 me-2 bg-light bar"
        :class="strength.id >= bar.id ? 'active' : ''"
        :title="bar.value"
      ></li>
    </ul>
    <strong>TEST LANG: {{ i18n.veryStrong }}</strong>
  </div>
</template>

<script>
import { passwordStrength } from 'check-password-strength'

export default {
    data: () => {
        return {
            i18n: {
                invalid: 'Invalid',
                tooWeak: 'Too Weak',
                weak: 'Weak',
                medium: 'Medium',
                strong: 'Strong',
                veryStrong: 'Very Strong'
            },
            enteredPassword: '',
            passwordVisible: false,
            passwordStrengthOptions: []
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
            return passwordStrength(
                this.enteredPassword,
                this.passwordStrengthOptions
            )
        },
        bars() {
            return this.passwordStrengthOptions.filter(
                (option) => option.id >= 0
            )
        }
    },
    mounted() {
        if (window.ccmi18n_passwordInput) {
            for (const key in this.i18n) {
                if (window.ccmi18n_passwordInput[key]) {
                    this.i18n[key] = window.ccmi18n_passwordInput[key]
                }
            }
        }

        this.passwordStrengthOptions = [
            {
                id: -1,
                value: this.i18n.invalid, // concretecms requirement: min 5 character
                minDiversity: 0,
                minLength: 0
            },
            {
                id: 0,
                value: this.i18n.tooWeak,
                minDiversity: 1,
                minLength: 5
            },
            {
                id: 1,
                value: this.i18n.weak,
                minDiversity: 2,
                minLength: 6
            },
            {
                id: 2,
                value: this.i18n.medium,
                minDiversity: 4,
                minLength: 8
            },
            {
                id: 3,
                value: this.i18n.strong,
                minDiversity: 4,
                minLength: 12
            },
            {
                id: 4,
                value: this.i18n.veryStrong,
                minDiversity: 4,
                minLength: 16
            }
        ]
    }
}
</script>

<style lang="scss" scoped>
* {
  --var-active-color: #b8d935;
}

.password-strength-meter {
  height: 3px;
  list-style: none;
  padding: 0;

  .bar {
    box-shadow: 0 0 0 0 var(--var-active-color) inset;
    cursor: help;
    transition: all ease-in 200ms;

    &.active {
      box-shadow: 1000px 0 0 0 var(--var-active-color) inset;
    }

    &:last-child {
      margin-right: 0 !important;
    }
  }
}
</style>
