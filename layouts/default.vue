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
  head() {
    return {
      bodyAttrs: {
        class: this.openMenu ? 'no-scroll' : '',
      },
    }
  },
  created() {
    this.$store.dispatch('closeMenu')
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
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
