<template>
  <div class="content-wrapper" :class="path">
    <top-header :class="top ? 'top' : ''" />
    <NuxtPage />
    <transition name="modal">
      <modal-wrapper
        v-if="showAlergicModal"
        header-title="Información sobre alérgenos"
        image="tabla-alergenos-restaurantes"
        :close="() => $store.dispatch('toggleAlergicModal')"
      >
        <alergics />
      </modal-wrapper>
    </transition>
  </div>
</template>
<script>
export default defineNuxtComponent({
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
    showAlergicModal() {
      return this.$store.state.showAlergicModal
    },
    path() {
      return this.$route.path.replace('/', '')
        ? this.$route.path.replace('/', '') + '-page'
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
          textos[doc.id] = doc.data().value
        })
      })
      .then(() => this.$store.dispatch('loadTxt', textos))
  },

  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
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
})
</script>
<style>
html {
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
