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
        <ul @click="closeMenu">
          <nuxt-link to="/"><li class="uppercase">Inicio</li></nuxt-link>
          <li class="uppercase">
            Nuestras especialides
            <ul>
              <nuxt-link to="#"><li>Menu degutación</li></nuxt-link>
              <nuxt-link to="#"><li>Tartar de atún rojo</li></nuxt-link>
              <nuxt-link to="#"><li>Gamba roja nacional</li></nuxt-link>
            </ul>
          </li>

          <nuxt-link to="#"><li class="uppercase">Reservar</li></nuxt-link>
          <nuxt-link to="/menu"><li class="uppercase">Menu</li></nuxt-link>
          <nuxt-link to="#"
            ><li class="uppercase">Horario & contacto</li></nuxt-link
          >
          <nuxt-link to="#"><li class="uppercase">Imágenes</li></nuxt-link>
        </ul>
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
    closeMenu() {
      this.$store.dispatch('closeMenu')
    },
  },
}
</script>
<style lang="scss">
#menuToggle {
  display: block;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  color: $colorGrey;

  a {
    text-decoration: none;
    color: $colorGrey;
    transition: all 0.3s ease;
    &:hover {
      color: $colorTurq;
      font-weight: bold;
      li {
        transform: skewX(-9deg);
      }
    }
  }

  .hamburger {
    display: block;
    width: 36px;
    height: 32px;
    position: absolute;
    top: 40px;
    left: 35px;
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
  #menu {
    position: absolute;
    width: 100%;
    height: 100vh;
    padding: 50px;
    background: #ffffff;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    z-index: 1;
    &:before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      z-index: -1;
      background-image: url('/img/imagen_mar_100.png');
      background-position: bottom;
      background-repeat: no-repeat;
    }
    > * {
      padding-bottom: 8px;
      font-size: 1.45rem;
    }
    @include md {
      width: 45%;
      padding-top: 75px;
    }
    ul {
      list-style-type: none;
      padding: 0;
      .uppercase {
        padding-bottom: 24px;
        ul li {
          text-transform: none;
          padding-top: 4px;
        }
      }
    }
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
