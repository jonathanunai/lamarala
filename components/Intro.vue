<template>
  <div class="full-screen" :style="backgroundStyle"></div>
</template>
<script>
export default {
  computed: {
    backgroundStyle() {
      return [
        {
          backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fla-mar-sala-portada.jpg?alt=media)`,
        },
      ]
    },
  },
}
</script>
<style lang="scss">
.full-screen {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
}
</style>
