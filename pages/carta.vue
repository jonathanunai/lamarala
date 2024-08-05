<template>
  <div class="container menu-page">
    <div class="left-col">
      <ul class="menu-links">
        <li
          v-for="section in config.sections"
          :key="section.key"
          v-scroll-to="`#section${section.key}`"
        >
          {{ lang === 'es' ? section.value : section.valueEn }}
        </li>
        <li @click="toggleModal()">
          {{ lang === 'en' ? 'Wine menu' : 'Carta de vinos' }}
        </li>
        <li @click="toggleModalDegustacion()">
          {{ lang === 'en' ? 'Tasting menu' : 'Menú degustación' }}
        </li>
      </ul>

      <div v-for="section in config.sections" :key="section.key">
        <template v-if="section && section.value !== ''">
          <h2 :id="`section${section.key}`">
            {{ lang === 'es' ? section.value : section.valueEn }}
          </h2>
          <menu-list :menu="menu[`section${section.key}`]" />
          <menu-list v-if="section.key === '1'" :menu="menu.Entrada" />
          <menu-list v-if="section.key === '3'" :menu="menu.Arroz" />
          <menu-list v-if="section.key === '4'" :menu="menu.Pescado" />
          <menu-list v-if="section.key === '5'" :menu="menu.Carne" />
          <menu-list v-if="section.key === '7'" :menu="menu.Postre" />
          <star class="hide-on-large" />
        </template>
      </div>

      <transition name="modal">
        <modal-wrapper
          v-if="showVinos"
          header-title="Carta de vinos"
          image="winetitle"
          @toggleModal="toggleModal"
        >
          <vinos :vinos="menu.Vino" :zones="config.zones" />
        </modal-wrapper>
      </transition>
      <transition name="modal">
        <modal-wrapper
          v-if="showDegustacion"
          header-title=""
          image="menutitle"
          @toggleModal="toggleModalDegustacion"
        >
          <menu-degustacion :items="menu.Degustacion" modal="true" />
        </modal-wrapper>
      </transition>
      <span v-if="menu.Pan && menu.Pan[0]" class="smalltext">
        {{ menu.Pan[0].nombre }} {{ menu.Pan[0].precio }}
        {{ menu.Pan[0].desc }}
      </span>
    </div>
    <div class="right-col">
      <div class="right-col-inner">
        <div
          v-for="section in config.sections"
          :key="section.key"
          v-scroll-to="`#section${section.key}`"
          class="img-wrapper"
        >
          <img
            v-if="section.value"
            :src="`https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection${section.key}.jpeg?alt=media`"
            alt=""
          />
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
      menu: {},
      showVinos: false,
      showDegustacion: false,
      config: {},
    }
  },
  computed: {
    lang() {
      return this.$store.state.activeLanguage
    },
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
        .collection('Config')
        .doc('values')
        .get()
        .then((doc) => {
          this.config = doc.data()
        })
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
.menu-page {
  justify-content: left;
  padding-top: 120px;
  padding-bottom: 24px;
  flex-wrap: wrap;
  @include md {
    align-items: stretch;
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
    @include md {
      &.in-modal {
        display: none;
      }
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
  .vinos {
    h2 {
      color: $colorTurq;
      font-size: 1.8rem;
      letter-spacing: 0.25rem;
      padding: 0;
      padding-top: 24px;
      padding-bottom: 6px;
      margin: 24px auto;
      background: none;
      text-align: left;
      text-shadow: none;
      border-bottom: 1px solid;
    }
  }

  #section1 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection1.jpeg?alt=media');
  }
  #section2 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection2.jpeg?alt=media');
  }
  #section3 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection3.jpeg?alt=media');
  }
  #section4 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection4.jpeg?alt=media');
  }
  #section5 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection5.jpeg?alt=media');
  }
  #section6 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection6.jpeg?alt=media');
  }
  #section7 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection7.jpeg?alt=media');
  }
  #section8 {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fsection8.jpeg?alt=media');
  }

  *[id^='section'] {
    @include md {
      background-image: none !important;
    }
  }
  .smalltext {
    color: $colorDark;
    display: block;
    margin: 10px auto 24px;
  }
}
</style>
