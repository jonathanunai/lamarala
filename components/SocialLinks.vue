<template>
  <div class="social-menu">
    <facebook-logo />
    <twitter-logo />
    <google-logo />
  </div>
</template>
<script>
import FacebookLogo from '@/assets/svg/facebook.svg'
import TwitterLogo from '@/assets/svg/twitter.svg'
import GoogleLogo from '@/assets/svg/google.svg'

export default {
  components: { FacebookLogo, TwitterLogo, GoogleLogo },
}
</script>
<style lang="scss">
.social-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    width: 22px;
    height: 22px;
    margin: 8px auto;
  }
}
</style>
