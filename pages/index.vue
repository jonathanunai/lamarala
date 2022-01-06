<template>
  <div class="onepage-container">
    <intro />
    <presentacion />
    <star class="hide-on-large" />
    <menu-degustacion :items="degustacion" />
    <star class="hide-on-large" />
    <contact />
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: {},
    }
  },
  computed: {
    degustacion() {
      return this.menu.Degustacion
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$firebase
        .firestore()
        .collection('Menu')
        .where('isActive', '==', 1)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (
              !Object.prototype.hasOwnProperty.call(this.menu, doc.data().tipo)
            )
              this.$set(this.menu, doc.data().tipo, [])
            this.menu[doc.data().tipo].push({ id: doc.id, ...doc.data() })
          })
        })
    },
  },
}
</script>
<style lang="scss">
.onepage-container {
  max-width: 640px;
  padding: 110px 24px 24px;
  margin: auto;
  color: $colorDark;
  h1 {
    font-size: 1rem;
    letter-spacing: 0.22rem;
    text-transform: uppercase;
    color: $colorTurq;
    padding-bottom: 16px;
    @include md {
      font-size: 1.3rem;
    }
  }
  h2 {
    font-size: 1rem;
    letter-spacing: 0.22rem;
    text-transform: uppercase;
    color: $colorTurq;
    padding-bottom: 16px;
  }
  p {
    padding-bottom: 1rem;
  }
}
</style>
