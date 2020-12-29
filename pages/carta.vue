<template>
  <div class="container menu-page">
    <div class="left-col">
      <logo :header="true" />
      <ul class="menu-links">
        <li v-scroll-to="'#entradas'" @click="changeImg('entradas')">
          Entradas para compartir
        </li>
        <li v-scroll-to="'#mariscos'" @click="changeImg('mariscos')">
          Mariscos
        </li>
        <li v-scroll-to="'#pescados'" @click="changeImg('pescados')">
          Plato pricipal
        </li>
        <ul>
          <li v-scroll-to="'#pescados'" @click="changeImg('pescados')">
            Pescados y arroz
          </li>
          <li v-scroll-to="'#carnes'" @click="changeImg('carnes')">Carne</li>
        </ul>
        <li v-scroll-to="'#postres'" @click="changeImg('postres')">Postres</li>
      </ul>
      <!-- <star class="hide-on-large" /> -->

      <h2 id="entradas" v-observe-visibility="visibilityChanged">Entradas</h2>
      <menu-list :menu="menu.Entrada" />
      <star class="hide-on-large" />

      <h2 id="mariscos" v-observe-visibility="visibilityChanged">Mariscos</h2>
      <menu-list :menu="menu.Marisco" />
      <star class="hide-on-large" />

      <h2 id="pescados" v-observe-visibility="visibilityChanged">
        Pescado y Arroz
      </h2>
      <menu-list :menu="menu.Arroz" />
      <menu-list :menu="menu.Pescado" />
      <star class="hide-on-large" />

      <h2 id="carnes" v-observe-visibility="visibilityChanged">Carnes</h2>
      <menu-list :menu="menu.Carne" />
      <star class="hide-on-large" />

      <h2 id="postres" v-observe-visibility="visibilityChanged">Postres</h2>
      <menu-list :menu="menu.Postre" />
      <star class="hide-on-large" />
      <span class="smalltext">Servicio de pan 1.90 IVA incluido</span>
    </div>
    <div class="right-col" :class="imageDisplayed"></div>
  </div>
</template>
<script>
import MenuList from '~/components/MenuList.vue'
export default {
  layout: 'temp',
  components: { MenuList },
  data() {
    return {
      imageDisplayed: 'inicio',
      menu: {
        Entrada: [],
        Pescado: [],
        Carne: [],
        Arroz: [],
        Postre: [],
        Marisco: [],
      },
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created() {
    this.loadData()
  },

  methods: {
    loadData() {
      this.$firebase
        .firestore()
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().isActive !== 0)
              this.menu[doc.data().tipo].push({ id: doc.id, ...doc.data() })
          })
        })
    },

    changeImg(imgClass) {
      // this.imageDisplayed = imgClass
    },
    handleScroll() {},
    visibilityChanged(isVisible, entry) {
      // console.log(entry.target.id + isVisible)
      // console.log(entry)
      // if (isVisible) this.changeImg(entry.target.id)
    },
  },
}
</script>
<style lang="scss">
.menu-page {
  justify-content: left;
  h2 {
    text-transform: uppercase;
    color: #ffffff;
    font-weight: 400;
    letter-spacing: 0.45rem;
    font-size: 2.1rem;
    padding-top: 105px;
    margin: 16px -24px;
    background-position: center;
    background-size: cover;
    background-color: $colorTurq;

    @include md {
      color: $colorTurq;
      font-size: 1.6rem;
      letter-spacing: 0.25rem;
      padding: 0;
      padding-top: 40px;
      margin: 24px auto;
      background: none;
      text-align: left;
    }
  }

  .inicio {
    background-image: url('/img/Pez-mantequilla.jpg');
  }
  #entradas {
    background-image: none;
  }
  #pescados {
    background-image: none;
  }
  #mariscos {
    background-image: none;
  }
  #arroces {
    background-image: none;
  }
  #carnes {
    background-image: none;
  }
  .smalltext {
    color: $colorDark;
    display: block;
    margin: 10px auto 24px;
  }
}
</style>
