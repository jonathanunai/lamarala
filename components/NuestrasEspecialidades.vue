<template>
  <div class="special-page">
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
        v-scroll-to="'#AtunRojo'"
        :class="selected === 'AtunRojo' ? 'selected' : ''"
      >
        Tartar de atún rojo salvaje
      </li>
      <li :class="selected === 'GambaRoja' ? 'selected' : ''">
        Gamba roja nacional
      </li>
    </ul>
    <star />
    <ul>
      <li id="MenuDegustacion"><menu-degustacion /></li>
      <li id="AtunRojo"><atun-rojo /></li>
    </ul>

    <star class="hide-on-large" />
  </div>
</template>
<script>
import AtunRojo from '~/components/AtunRojo'
import MenuDegustacion from '~/components/MenuDegustacion'

export default {
  components: { MenuDegustacion, AtunRojo },
  data() {
    return {
      selected: 'MenuDegustacion',
    }
  },
  computed: {},
  methods: {
    load(section) {
      this.selected = section
      this.$scrollTo('#menu-star', 200, [])
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
  .fixed-height {
    min-height: 450px;
  }
  h2 {
    text-transform: uppercase;
    color: #ffffff;
    font-weight: 400;
    letter-spacing: 0.45rem;
    font-size: 1.3rem;
    padding: 75px 0 0 12px;
    margin: 16px -24px;
    background-position: center;
    background-size: cover;
    // background-image: url('/img/gambita-roja-fresca.jpg');
    background: $colorTurq;

    @include md {
      font-size: 1.3rem;
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
