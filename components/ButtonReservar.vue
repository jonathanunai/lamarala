<template>
  <div class="book-button" :class="white ? 'white' : ''">RESERVAR</div>
</template>
<script>
export default {
  props: { white: { type: Boolean, default: true } },
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
}
.white {
  color: #ffffff;
  border-color: #ffffff;
}
</style>
