<template>
  <div class="social-menu" :class="column ? 'column' : ''">
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
  props: { column: { type: Boolean, default: false } },
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
.column {
  flex-direction: row;
  padding: 8px 0;
  svg {
    margin: 8px;
  }
}
</style>
