<template>
  <div>
    <div v-for="set in styleList.sets">
      <h5>{{ set.name }}</h5>
      <div class="card mb-4">
        <ul class="list-group list-group-flush">
          <li v-for="style in set.styles" class="list-group-item">
            <component @update="update" :style-value="style"
                       :is="style.style.type.replace('_','-') + '-page-customizer-widget'"></component>
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
  methods: {
    update(styleValue) {
      var styles = []
      this.styles.forEach(function(style) {
        if (style.variable === styleValue.variable) {
          style.value = styleValue.value // This handles keeping the source of truth in sync with the child components
        }
        styles.push(style)
      })
      this.styles = styles

      var src = this.previewAction + '&pThemeID=1&pTemplateID=1';
      $('#ccm-page-preview-frame').get(0).src = src;

    }
  },
  data: function() {
    return {
      styles: []
    }
  },
  mounted() {
    for (var i = 0; i < this.styleList.sets.length; i++) {
      var styleSet = this.styleList.sets[i]
      for (var j = 0; j < styleSet.styles.length; j++) {
        var style = styleSet.styles[j]
        this.styles.push({
          variable: style.style.variable,
          value: style.value
        })
      }
    }
  },
  props: {
    previewAction: {
      type: String
    },
    styleList: {
      type: Object
    }
  }
}
</script>
