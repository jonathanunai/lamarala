<template>
  <div class="top-header">
    <nav-menu />
    <nuxt-link to="/"><logo /></nuxt-link>
    <contact-bar />
    <language-switcher />
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
      background: transparent;
      .logo-wrapper {
        left: 50%;
        transform: translateX(-50%);
        width: 330px !important;
        max-width: 100%;
        top: 7vh;
        @include md {
          left: 120px;
          width: 360px !important;
          transform: translateX(0);
        }
      }
    }
  }
}
.top-header {
  background: white;
  width: 100%;
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
    #menuToggle .hamburger {
      transition: all 0.3s ease;
      top: 40px;
    }
    .logo-wrapper {
      transition: all 0.3s ease;

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
    .language-wrapper {
      top: 36px;
      transition: all 0.3s ease;
    }
  }
}
</style>
