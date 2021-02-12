<template>
  <nav role="navigation">
    <div id="menuToggle" :class="openMenu ? 'open' : ''">
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div id="menu">
        <img src="/img/simbolo_la_mar_sala.png" />
        <ul @click="closeMenu">
          <nuxt-link to="/"><li class="uppercase">Inicio</li></nuxt-link>
          <li class="uppercase" v-if="false">
            Nuestras especialides
            <ul>
              <nuxt-link :to="{ path: '/', hash: '#MenuDegustacion' }"
                ><li>Menu degutación</li></nuxt-link
              >
              <nuxt-link :to="{ path: '/', hash: '#AtunRojo' }"
                ><li>Tartar de atún rojo</li></nuxt-link
              >
              <nuxt-link to="/"><li>Gamba roja nacional</li></nuxt-link>
            </ul>
          </li>

          <nuxt-link to="/reservas"
            ><li class="uppercase">Reservar</li></nuxt-link
          >
          <nuxt-link to="/carta"><li class="uppercase">Menu</li></nuxt-link>
          <nuxt-link :to="{ path: '/', hash: '#horario-y-contacto' }"
            ><li class="uppercase">Horario & contacto</li></nuxt-link
          >
          <nuxt-link to="/"><li class="uppercase">Imágenes</li></nuxt-link>
        </ul>
        <social-links />
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
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

    &:hover {
      color: $colorTurq;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

      li {
        transform: skewX(-9deg);
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      }
    }
  }

  .hamburger {
    display: block;
    width: 36px;
    height: 32px;
    position: fixed;
    top: 20px;
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
    overflow: scroll;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 50px;
    padding-top: 20px;
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
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      z-index: -1;
      background-image: url('/img/imagen_mar_100.png');
      background-position: bottom;
      background-repeat: no-repeat;
      @include md {
        width: 45%;
      }
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
