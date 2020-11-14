<template>
  <div class="contact-bar-wrapper">
    <div>Calle Honda, 9 45003 Toledo</div>
    <div>Tel.: 925 254 785</div>
    <div></div>
    <div class="boxed">RESERVAR</div>
  </div>
</template>
<style lang="scss">
.contact-bar-wrapper {
  position: fixed;
  top: 30px;
  right: 30px;
  width: 49%;
  min-width: 400px;
  display: flex;
  color: $colorDark;
  background: $colorLight;
  padding: 8px;
  justify-content: space-between;
  > * {
    white-space: nowrap;
    min-width: 20px;
  }
  .boxed {
    border: 1px solid $colorDark;
    padding: 0 6px;
  }
}
</style>
