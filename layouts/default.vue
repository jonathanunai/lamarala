<template>
  <div class="content-wrapper">
    <nav-menu />
    <contact-bar />
    <Nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    openMenu() {
      return this.$store.state.menuOpen
    },
  },
  created() {
    this.$store.dispatch('closeMenu')
  },

  head() {
    return {
      bodyAttrs: {
        class: this.openMenu ? 'no-scroll' : '',
      },
    }
  },
}
</script>
<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
