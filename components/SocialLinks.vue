<template>
  <div class="social-menu" :class="column ? 'column' : ''">
    <a href="https://www.facebook.com/lamarsalatoledo" target="_blank"
      ><facebook-logo
    /></a>
    <a href="https://twitter.com/lamarsalatoledo" target="_blank"
      ><twitter-logo
    /></a>
  </div>
</template>
<script>
import FacebookLogo from '@/assets/svg/facebook.svg'
import TwitterLogo from '@/assets/svg/twitter.svg'

export default {
  components: { FacebookLogo, TwitterLogo },
  props: { column: { type: Boolean, default: false } },
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
  &.column {
    flex-direction: row;
    padding: 8px;
    svg {
      margin: 8px;
    }
  }
}
</style>
