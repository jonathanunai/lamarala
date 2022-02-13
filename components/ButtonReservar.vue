<template>
  <nuxt-link to="/reservas" class="book-button" :class="white ? 'white' : ''">
    {{ lang === 'en' ? 'BOOK A TABLE' : 'RESERVAR' }}
  </nuxt-link>
</template>
<script>
export default {
  props: { white: { type: Boolean, default: true } },
  computed: {
    lang() {
      return this.$store.state.activeLanguage
    },
  },
}
</script>
<style lang="scss">
.book-button {
  position: absolute;
  bottom: 42px;
  color: $colorGrey;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid $colorGrey;
  padding: 2px 8px;
  text-decoration: none;
}
.white {
  color: #ffffff;
  border-color: #ffffff;
}
</style>
