<template>
  <div class="star-wrapper">
    <img src="/img/simbolo_la_mar_sala.png" alt="Estrella La Mar Salá" />
  </div>
</template>

<style lang="scss">
.star-wrapper {
  width: 100%;
  background: #ffffff;
  margin: 0 auto;
  text-align: center;
  animation: 1s appear;
  img {
    width: 60px;
  }
  @include md {
    width: unset;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
