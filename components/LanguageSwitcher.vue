<template>
  <div class="language-wrapper">
    <es-lang :class="active === 'es' ? 'active' : ''" @click="change('es')" />
    <en-lang :class="active === 'en' ? 'active' : ''" @click="change('en')" />
  </div>
</template>
<script>
import enLang from '@/assets/svg/en-language.svg'
import esLang from '@/assets/svg/es-language.svg'

export default {
  components: { esLang, enLang },
  computed: {
    active() {
      return this.$store.state.activeLanguage
    },
  },
  methods: {
    change(lang) {
      this.$store.dispatch('changeLanguage', lang)
    },
  },
}
</script>
<style lang="scss">
.language-wrapper {
  position: fixed;
  right: 20px;
  top: 16px;
  transition: all 0.3s ease;

  @include md {
  }
  svg {
    width: 24px;
    fill: #727277;
    cursor: pointer;
    &.active {
      fill: #008d8a;
    }
  }
}
</style>
