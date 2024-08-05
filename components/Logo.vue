<template>
  <div class="logo-wrapper">
    <img
      src="/LogoLaMarSala.png"
      alt="Logo cabecera La Mar Salá"
      :class="header ? 'header-logo' : ''"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: { type: Boolean, default: false },
    }
  },
}
</script>
<style lang="scss">
.logo-wrapper {
  width: 100%;
  margin: 0 auto;
  padding: 8px 0;
  text-align: center;
  animation: 1s appear;
  display: inline-block;
  img {
    width: 220px;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
