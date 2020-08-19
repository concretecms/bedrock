<template>
    <div class="ccm-search-results-pagination">
        <nav :aria-label="ariaLabel">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" :aria-label="labelPrevPage" @click.prevent="onClick('prev')">
                        <span aria-hidden="true">{{prevText}}</span>
                    </a>
                </li>
                <li v-for="page in pageList" :key="page.number" :class="{'page-item': true, 'active': page.number === currentPage}"><a class="page-link" href="#" @click.prevent="onClick(page.number)">{{page.text || page.number}}</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" :aria-label="labelNextPage" @click.prevent="onClick('next')">
                        <span aria-hidden="true">{{nextText}}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
/**
 * @vue-data {Number} targetNumberOfLinks - Number of pages to display around the current page (including the current page).
 * @vue-data {Number} currentPage - The page that is being displayed.
 * @vue-data {Number} localNumberOfPages - Total number of pages that can be displayed.
 * @vue-prop {String} ariaLabel - Nav aria-label attribute content
 * @vue-prop {String} nextText - Text on the next button
 * @vue-prop {String} labelNextPage - Aria-label attribute on the next button
 * @vue-prop {String} prevText - Text on the previous button
 * @vue-prop {String} labelPrevPage - Aria-label attribute on the previous button
 * @vue-prop {Number,String} perPage - Number of results displayed per page
 * @vue-prop {Number,String} totalRows - Total number of results
 */
export default {
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        ariaLabel: {
            type: String
        },
        nextText: {
            type: String,
            default: 'Next →'
        },
        labelNextPage: {
            type: String,
            default: 'Next'
        },
        labelPrevPage: {
            type: String,
            default: 'Previous'
        },
        prevText: {
            type: String,
            default: '← Previous'
        },
        perPage: {
            type: [Number, String],
            default: 20,
            validator: value => value >= 1
        },
        totalRows: {
            type: [Number, String],
            default: 0,
            validator: value => value >= 0
        },
        value: {
            type: [Number, String],
            default: null,
            validator: value => value >= 0
        }
    },
    data () {
        let currentPage = parseInt(this.value)
        currentPage = currentPage > 0 ? currentPage : 1

        return {
            targetNumberOfLinks: 3,
            currentPage,
            localNumberOfPages: 1
        }
    },
    computed: {
        numberOfPages () {
            return Math.max(1, Math.ceil(this.totalRows / this.perPage))
        },

        /**
         * Create the list of pages that should be displayed
         * @returns {{number: *}[]}
         */
        pageList () {
            let startPage = 1
            let nrOfPages = Math.min(this.localNumberOfPages, this.targetNumberOfLinks)
            if (this.localNumberOfPages > nrOfPages) {
                // Set start page to current page minus half of the maximum number of links.
                // This keeps the current page in the middle (unless this sets start page to less then 1).
                startPage = Math.max(1, this.currentPage - Math.ceil((nrOfPages - 1) / 2))

                // Check that startPage hasn't reached the end of the list
                startPage = Math.min(this.localNumberOfPages - nrOfPages + 1, startPage)
            }

            // Make sure the number of pages in pagination stay the same
            if (startPage === 1) {
                nrOfPages = Math.min(nrOfPages + 2, this.localNumberOfPages)
            } else if (startPage === 2) {
                nrOfPages = Math.min(nrOfPages + 1, this.localNumberOfPages)
            }

            if (this.currentPage >= this.localNumberOfPages - 2) {
                nrOfPages = Math.min(nrOfPages + 2, this.localNumberOfPages)
                startPage = this.localNumberOfPages - nrOfPages + 1
            }

            const endPage = startPage + nrOfPages - 1

            const pages = [...new Array(nrOfPages)].map((val, i) => ({ number: startPage + i }))

            // Add start ellipsis
            if (startPage > 3) {
                pages.unshift({ number: -1, text: '...' })
            }

            // Add second page
            if (startPage === 3) {
                pages.unshift({ number: 2 })
            }

            // Add first page
            if (startPage > 1) {
                pages.unshift({ number: 1 })
            }

            // Add end ellipsis
            if (endPage < this.localNumberOfPages - 2) {
                pages.push({ number: -2, text: '...' })
            }

            // Add second to last number
            if (endPage === this.localNumberOfPages - 2) {
                pages.push({ number: this.localNumberOfPages - 1 })
            }

            // Add last number
            if (endPage < this.localNumberOfPages) {
                pages.push({ number: this.localNumberOfPages })
            }

            return pages
        }
    },
    watch: {
        value (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.currentPage = Math.max(1, newValue)
            }
        },
        currentPage (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.$emit('input', newValue > 0 ? newValue : null)
            }
        }
    },
    created () {
        this.localNumberOfPages = this.numberOfPages
    },
    methods: {
        onClick (num) {
            // Prev/next
            if (num === 'prev') {
                num = Math.max(1, this.currentPage - 1)
            } else if (num === 'next') {
                // Gets corrected if too high
                num = this.currentPage + 1
            }

            if (num < 1) {
                // Ignore ellipsis clicked
                return
            } else if (num > this.numberOfPages) {
                num = this.numberOfPages
            }

            // Update the v-model
            this.currentPage = num

            // Emit event triggered by user interaction
            this.$emit('change', this.currentPage)
        }
    }
}
</script>
