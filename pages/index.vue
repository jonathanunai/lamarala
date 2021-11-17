<template>
  <div class="onepage-container">
    <intro />
    <presentacion />
    <menu-degustacion />
    <contact />
  </div>
</template>
<script>
export default {
  watch: {},
}
</script>
<style lang="scss">
.onepage-container {
  max-width: 640px;
  padding: 110px 24px 24px;
  margin: auto;
  color: $colorDark;
  h1 {
    font-size: 1rem;
    letter-spacing: 0.22rem;
    text-transform: uppercase;
    color: $colorTurq;
    padding-bottom: 16px;
    @include md {
      font-size: 1.3rem;
    }
  }
  h2 {
    font-size: 1rem;
    letter-spacing: 0.22rem;
    text-transform: uppercase;
    color: $colorTurq;
    padding-bottom: 16px;
  }
  p {
    padding-bottom: 1rem;
  }
}
</style>
