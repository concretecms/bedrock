<template>
  <div>
    <div v-for="set in styleList.sets">
      <h5>{{ set.name }}</h5>
      <div class="card mb-4">
        <ul class="list-group list-group-flush">
          <li v-for="style in set.styles" class="list-group-item">
            <component :style-object="style.style" :is="style.style.type.replace('_','-') + '-page-customizer-widget'"></component>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* global ConcreteEvent */
import ColorPageCustomizerWidget from './ColorPageCustomizerWidget'
import FontFamilyPageCustomizerWidget from './FontFamilyPageCustomizerWidget'

export default {
    components: {
        ColorPageCustomizerWidget,
        FontFamilyPageCustomizerWidget
    },
    data() {
        return {
       }
    },
    computed: {},
    props: {
        styleList: {
           type: Object
        }
    }
}
</script>
