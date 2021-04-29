<template>
  <div class="top-header">
    <nav-menu />
    <nuxt-link to="/"><logo /></nuxt-link>
    <contact-bar />
  </div>
</template>
<script>
export default {
  created() {},
}
</script>
<style lang="scss">
.home-page {
  .top-header {
    &.top {
      .logo-wrapper {
        left: 50%;
        transform: translateX(-50%);
        width: 330px !important;
        top: 18vh;
        @include md {
          left: 120px;
          width: 300px !important;
          transform: translateX(0);
        }
      }
    }
  }
}
.top-header {
  width: 100%;
  background: white;
  position: fixed;
  height: 60px;
  z-index: 100;
  .logo-wrapper {
    position: relative;
    left: 90px;
    top: 0;
    width: 200px !important;
    transition: all 0.3s ease;

    .header-logo {
      width: 102px;
      transition: all 0.3s ease;
    }
  }
  &.top {
    height: auto;
    #menuToggle .hamburger {
      transition: all 0.3s ease;
      top: 40px;
    }
    .logo-wrapper {
      transition: all 0.3s ease;

      @include md {
      }
      .header-logo {
        width: 100%;
        transition: all 0.3s ease;
      }
    }
    .contact-bar-wrapper {
      @include md {
        top: 30px;
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
