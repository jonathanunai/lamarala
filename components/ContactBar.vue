<template>
  <div class="contact-bar-wrapper">
    <div>c/ Honda, 9 45003 Toledo</div>
    <div><a href="tel:+34925254785">Tel. 925 254 785</a></div>
    <div class="hidden-sm"></div>
    <nuxt-link to="/reservas">
      <div class="boxed hidden-sm">RESERVAR</div>
    </nuxt-link>
  </div>
</template>
<style lang="scss">
.contact-bar-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  color: $colorDark;
  padding: 8px;
  justify-content: space-around;
  z-index: 8;
  background: url('/img/franja_imagen_inferior_15.png');
  background-position: center;
  background-size: cover;
  font-size: 0.8rem;
  @include md {
    top: 10px;
    transition: all 0.3s ease;
    right: 30px;
    bottom: unset;
    background: $colorLight;
    width: 44%;
    min-width: 400px;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  > * {
    white-space: nowrap;
    min-width: 20px;
  }
  a {
    text-decoration: none;
    color: $colorDark;
  }
}
</style>
