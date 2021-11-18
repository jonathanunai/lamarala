<template>
  <div class="container menu-page">
    <div class="left-col">
      <ul class="menu-links">
        <li v-scroll-to="'#entradas'">Entradas para compartir</li>
        <li v-scroll-to="'#mariscos'">Mariscos</li>
        <li v-scroll-to="'#pescados'">Plato pricipal</li>
        <ul>
          <li v-scroll-to="'#pescados'">Pescados y arroz</li>
          <li v-scroll-to="'#carnes'">Carne</li>
        </ul>
        <li v-scroll-to="'#postres'">Postres</li>
        <li @click="toggleModal()">Carta de Vinos</li>
        <li v-if="false" @click="toggleModalDegustacion()">Menú Degustación</li>
      </ul>

      <h2 id="entradas">Entradas</h2>
      <menu-list :menu="menu.Entrada" />
      <star class="hide-on-large" />

      <h2 id="mariscos">Mariscos</h2>
      <menu-list :menu="menu.Marisco" />
      <star class="hide-on-large" />

      <h2 id="pescados">Pescado y Arroz</h2>
      <menu-list :menu="menu.Arroz" />
      <menu-list :menu="menu.Pescado" />
      <star class="hide-on-large" />

      <h2 id="carnes">Carnes</h2>
      <menu-list :menu="menu.Carne" />
      <star class="hide-on-large" />

      <h2 id="postres">Postres</h2>
      <menu-list :menu="menu.Postre" />
      <star class="hide-on-large" />

      <transition name="modal">
        <modal-wrapper
          v-if="showVinos"
          header-title="Carta de vinos"
          image="winetitle"
          @toggleModal="toggleModal"
        >
          <vinos :vinos="menu.Vino" />
        </modal-wrapper>
      </transition>
      <transition name="modal">
        <modal-wrapper
          v-if="showDegustacion"
          header-title="Menú degustación"
          image="menutitle"
          @toggleModal="toggleModalDegustacion"
        >
          <menu-degustacion :items="menu.Degustacion" />
        </modal-wrapper>
      </transition>
      <span v-if="menu.Pan[0]" class="smalltext">
        {{ menu.Pan[0].nombre }} {{ menu.Pan[0].precio }}
        {{ menu.Pan[0].desc }}
      </span>
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
        Pan: [],
      },
      showVinos: false,
      showDegustacion: false,
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
    toggleModalDegustacion() {
      this.showDegustacion = !this.showDegustacion
    },
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
              this.menu[doc.data().tipo] = []
            this.menu[doc.data().tipo].push({ id: doc.id, ...doc.data() })
          })
        })
      console.log(this.menu)
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
      text-shadow: none;
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
