<template>
  <div class="modal">
    <div class="modal__mask" @click="$emit('toggleModal')"></div>
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <h2 v-if="headerTitle" id="vinos" class="title" :class="image">
            {{ headerTitle }}
          </h2>
          <div class="modal__x" @click="$emit('toggleModal')">&times;</div>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div class="modal__footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['image', 'headerTitle'],
}
</script>
<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  &__mask {
    background: rgba(#000000, 0.65);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  &__wrapper {
    position: fixed;
    top: 1.2rem;
    width: 95vmin;
    height: 95vh;
    background: #fff;
    color: #333;
    display: flex;
    border-radius: 0.2em;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2), 0 1em 2em -1em;
    @include md {
      width: 65vmin;
      min-height: 35vmin;
    }
  }
  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__body {
    flex: 1;
    padding: 0 1.7em;
    overflow: auto;
  }
  &__footer {
    padding: 1em;
    text-align: right;
  }
  &__x {
    cursor: pointer;
    position: absolute;
    right: 15px;
    color: #ffffff;
    font-size: 3rem;
    text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.77);
  }
  h2 {
    background: $colorTurq;
    padding: 25px 0;

    @include md {
      color: #ffffff;
      padding-left: 1rem;
    }
  }
  h2.title {
    width: 100%;
    margin: 0;
    background: $colorTurq;
    padding-top: 80px;
    background-size: cover;

    @include md {
      color: #ffffff;
      padding-left: 1rem;
    }
  }
  h2.winetitle {
    background-image: url('/img/fotos/vinos-640.jpg');
  }
  h2.menutitle {
    background-image: url('/img/fotos/menu-640.jpg');
  }

  h3 {
    border-bottom: 2px solid $colorTurq;
    padding: 0.5rem;
    padding-top: 2rem;
  }
  h4 {
    color: #008d8a;
    font-size: 1.23rem;
    letter-spacing: 0.25rem;
    padding: 0;
    padding-top: 20px;
    margin: 6px auto;
    background: none;
    text-align: left;
    text-shadow: none;
    text-transform: uppercase;
    font-weight: 400;
  }
  .extra {
    text-align: center;
  }
}
</style>
