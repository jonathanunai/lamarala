<template>
  <div class="container special-page">
    <div class="left-col">
      <!-- <logo :header="true" /> -->

      <h1>Nuestras especialidades</h1>
      <ul class="menu-links">
        <li
          :class="selected === 'MenuDegustacion' ? 'selected' : ''"
          @click="load('MenuDegustacion')"
        >
          Menú degustación
        </li>
        <li
          :class="selected === 'AtunRojo' ? 'selected' : ''"
          @click="load('AtunRojo')"
        >
          Tartar de atún rojo salvaje
        </li>
        <li
          :class="selected === 'GambaRoja' ? 'selected' : ''"
          @click="load('GambaRoja')"
        >
          Gamba roja nacional
        </li>
      </ul>
      <star class="hide-on-large" />
      <transition name="show">
        <component :is="selected" />
      </transition>

      <star class="hide-on-large" />
    </div>
    <div class="right-col" :class="selected"></div>
  </div>
</template>
<script>
import AtunRojo from '~/components/AtunRojo'
import GambaRoja from '~/components/GambaRoja'
import MenuDegustacion from '~/components/MenuDegustacion'

export default {
  components: { MenuDegustacion, AtunRojo, GambaRoja },
  data() {
    return {
      selected: 'MenuDegustacion',
    }
  },
  computed: {},
  methods: {
    load(section) {
      this.selected = section
    },
  },
}
</script>
<style lang="scss">
.special-page {
  align-items: unset;

  @include md {
    justify-content: left;
  }
  .selected {
    font-weight: bold;
  }
  .menu-links {
    padding-bottom: 40px;
  }
  p {
    text-align: left;
    color: $colorGrey;
    padding-bottom: 16px;
  }
  h1 {
    display: none;
    @include md {
      display: block;
      font-size: 1.6rem;
      color: $colorTurq;

      letter-spacing: 0.25rem;
      padding: 0;
      margin: 24px auto;
      text-align: left;
      background: none;
      text-transform: uppercase;
      font-weight: 400;
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
    background-image: url('/img/gambita-roja-fresca.jpg');
    @include md {
      display: none;
      font-size: 1.6rem;
      color: $colorTurq;

      letter-spacing: 0.25rem;
      padding: 0;
      margin: 24px auto;
      text-align: left;
      background: none;
    }
  }
  .MenuDegustacion {
    background-image: url('/img/percebe-gallego.jpg');
  }
  .AtunRojo {
    background-image: url('/img/gambita-roja-fresca.jpg');
  }
  .GambaRoja {
    background-image: url('/img/gambita-roja-fresca.jpg');
  }
}
</style>
