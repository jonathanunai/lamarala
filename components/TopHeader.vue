<template>
  <div class="top-header">
    <nav-menu />
    <logo class="to-left" />
    <contact-bar />
  </div>
</template>
<script>
export default {
  created() {},
}
</script>
<style lang="scss">
.top-header {
  width: 100%;
  background: white;
  position: fixed;
  height: 60px;

  &.top {
    height: auto;
    #menuToggle .hamburger {
      transition: all 0.3s ease;
      top: 40px;
    }
    .header-logo {
      width: 190px;
      transition: all 0.3s ease;
    }
    .contact-bar-wrapper {
      @include md {
        top: 30px;
        transition: all 0.3s ease;
      }
    }
  }
}
.to-left {
  position: relative;
  left: 90px;
  width: 220px !important;
}
</style>
