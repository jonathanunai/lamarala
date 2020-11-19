<template>
  <div class="logo-wrapper">
    <img src="/img/logo_la_mar_sala.png" alt="Logo cabecera La Mar Salá" />
  </div>
</template>

<style lang="scss">
.logo-wrapper {
  width: 100%;
  background: #ffffff;
  margin: 0 auto;
  text-align: center;
  animation: 1s appear;

  img {
    width: 220px;
  }
  img.star {
    width: unset;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
