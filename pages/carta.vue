<template>
  <div class="container menu-page">
    <div class="left-col">
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
        <li @click="toggleModal()">Carta de Vinos</li>
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
      <transition name="modal">
        <vinos
          v-if="showVinos"
          :vinos="menu.Vino"
          v-on:toggle="toggleModal()"
        />
      </transition>
      <span class="smalltext">Servicio de pan 1.90 IVA incluido</span>
    </div>
    <div class="right-col">
      <div class="right-col-inner">
        <div class="img-wrapper">
          <img src="/img/fotos/carpaccio-640.jpg" alt="" />
        </div>
        <div class="img-wrapper">
          <img src="/img/fotos/tartar-640.jpg" alt="" />
        </div>

        <div class="img-wrapper">
          <img src="/img/fotos/mariscos-640.jpg" alt="" />
        </div>
        <div class="img-wrapper">
          <img src="/img/fotos/arroz-carabinero-640.jpg" alt="" />
        </div>
        <div class="img-wrapper">
          <img src="/img/fotos/steak-tartar-640.jpg" alt="" />
        </div>
        <div class="img-wrapper">
          <img src="/img/fotos/torrija-640.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuList from '~/components/MenuList.vue'
export default {
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
        Vino: [],
      },
      showVinos: false,
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
    toggleModal() {
      this.showVinos = !this.showVinos
    },
    loadData() {
      this.$firebase
        .firestore()
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().isActive !== 0)
              if (
                Object.prototype.hasOwnProperty.call(this.menu, doc.data().tipo)
              )
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
  @include md {
    align-items: stretch;
  }
  padding-top: 120px;
  padding-bottom: 24px;
  flex-wrap: wrap;
  .left-col {
  }
  .right-col {
    top: 0px;
    position: relative;
    flex: 1;
    left: 0;
    height: auto;
    .right-col-inner {
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 100%;
    }
    .img-wrapper img {
      width: 100%;
    }
  }
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
    text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
      0px 18px 23px rgba(0, 0, 0, 0.1);

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

  #entradas {
    background-image: url('/img/fotos/carpaccio-640.jpg');
  }
  #pescados {
    background-image: url('/img/fotos/tartar-640.jpg');
  }
  #mariscos {
    background-image: url('/img/fotos/mariscos-640.jpg');
  }
  #arroces {
    background-image: url('/img/fotos/arroz-carabinero-640.jpg');
  }
  #carnes {
    background-image: url('/img/fotos/steak-tartar-640.jpg');
  }
  #postres {
    background-image: url('/img/fotos/torrija-640.jpg');
  }
  #entradas,
  #pescados,
  #mariscos,
  #arroces,
  #carnes,
  #postres {
    @include md {
      background-image: none;
    }
  }

  .smalltext {
    color: $colorDark;
    display: block;
    margin: 10px auto 24px;
  }
}
</style>
