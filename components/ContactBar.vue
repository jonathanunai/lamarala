<template>
  <div class="contact-bar-wrapper">
    <div class="hidden-smd">Calle Honda, 9 45003 Toledo</div>
    <div><a href="tel:+34925254785">Tel. 925 254 785</a></div>
    <div class="hidden-sm"></div>
    <div class="boxed">RESERVAR</div>
  </div>
</template>
<style lang="scss">
.contact-bar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  display: flex;
  color: $colorDark;
  background: $colorLight;
  padding: 8px;
  justify-content: space-between;
  z-index: 5;
  @include md {
    top: 30px;
    right: 30px;
    width: 47%;
    min-width: 400px;
  }

  > * {
    white-space: nowrap;
    min-width: 20px;
  }
  a {
    text-decoration: none;
    color: $colorDark;
  }
  .boxed {
    border: 1px solid $colorDark;
    padding: 0 6px;
  }
}
</style>
