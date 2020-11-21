<template>
  <div class="logo-wrapper">
    <img
      src="/img/logo_la_mar_sala.png"
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
  background: #ffffff;
  margin: 0 auto;
  padding: 8px 0;
  text-align: center;
  animation: 1s appear;
  display: inline-block;
  img {
    width: 220px;
  }
  img.header-logo {
    width: 190px;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
