<template>
  <nav role="navigation">
    <div id="menuToggle" :class="openMenu ? 'open' : ''">
      <!--
    Some spans to act as a hamburger.

    They are acting like a real hamburger,
    not that McDonalds stuff.
    -->
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <!--
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    -->
      <div id="menu">
        <img src="/img/simbolo_la_mar_sala.png" />

        <nuxt-link to="#"><div>Inicio</div></nuxt-link>
        <h3>Nuestras especialides</h3>
        <nuxt-link to="#"><div>Menu degutación</div></nuxt-link>
        <nuxt-link to="#"><div>Tartar de atún rojo</div></nuxt-link>
        <nuxt-link to="#"><div>Gamba roja nacional</div></nuxt-link>

        <nuxt-link to="" target="_blank"><div>Reservar</div></nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    openMenu() {
      return this.$store.state.menuOpen
    },
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch('toggleMenu')
    },
  },
}
</script>
<style lang="scss">
#menuToggle {
  display: block;
  position: relative;
  top: 50px;
  left: 50px;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  a {
    text-decoration: none;
    color: #232323;
    transition: color 0.3s ease;
    &:hover {
      color: tomato;
    }
  }

  .hamburger {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    z-index: 2; /* and place it over the hamburger */
    -webkit-touch-callout: none;
  }
  span {
    display: block;
    width: 33px;
    height: 2px;
    margin-bottom: 6px;
    position: relative;
    background: #cdcdcd;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }

  span:first-child {
    transform-origin: 0% 0%;
  }

  span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }

  /*
 * Transform all the slices of hamburger
 * into a crossmark.
 */

  /*
 * Make this absolute positioned
 * at the top left of the screen
 */
  #menu {
    position: absolute;
    width: 100%;
    height: 100vh;
    margin: -50px 0 0 -50px;
    padding: 50px;
    padding-top: 125px;
    background: #ffffff;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

    @include md {
      width: 45%;
    }
  }

  #menu li {
    padding: 10px 0;
    font-size: 22px;
  }
  &.open {
    span {
      opacity: 1;
      transform: rotate(45deg) translate(-3px, -18px);
      background: #232323;
    }
    span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    span:nth-last-child(2) {
      transform: rotate(-45deg) translate(-1px, 18px);
    }
    #menu {
      transform: none;
      box-shadow: 0 0 30px 10px rgba(23, 23, 23, 0.6);
    }
  }
}
</style>
