<template>
  <div class="content-wrapper" :class="path">
    <top-header :class="top ? 'top' : ''" />
    <Nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollPosition: null,
    }
  },
  computed: {
    top() {
      return this.scrollPosition < 10
    },
    openMenu() {
      return this.$store.state.menuOpen
    },
    path() {
      return this.$nuxt.$route.path.replace('/', '')
        ? this.$nuxt.$route.path.replace('/', '') + '-page'
        : 'home-page'
    },
  },
  created() {
    this.$store.dispatch('closeMenu')
    const textos = {}
    this.$firebase
      .firestore()
      .collection('Textos')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          /* if (!Object.prototype.hasOwnProperty.call(textos, doc.id))
              return */
          textos[doc.id] = doc.data().value
        })
      })
      .then(() => this.$store.dispatch('loadTxt', textos))
  },

  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY
    },
  },

  head() {
    return {
      bodyAttrs: {
        class: this.openMenu ? 'no-scroll' : '',
      },
    }
  },
}
</script>
<style>
html {
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
