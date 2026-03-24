<template>
  <div class="full-screen" :style="backgroundStyle"></div>
</template>
<script>
export default {
  computed: {
    backgroundStyle() {
      return [
        {
          backgroundImage: `url(https://res.cloudinary.com/dk7j4vigg/image/upload/images/la-mar-sala-portada)`,
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
