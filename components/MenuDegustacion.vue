<template>
  <div class="menu-degustacion-wrapper" :class="modal ? 'in-modal' : ''">
    <div class="menu-degustacion" :class="modal ? 'in-modal' : ''">
      <div class="p-4">
        <h2 class="degustacion">Menú degustación</h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div style="text-align: center" v-html="menuDegustacion"></div>
      </div>
      <div class="columns">
        <div class="left-col">
          <div class="list-wrapper">
            <menu-list :menu="orderedList" />
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="menuDegustacionPrecio"></div>
        </div>
        <div class="right-col" :style="backgroundStyle"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['items', 'modal'],
  data() {
    return {}
  },
  computed: {
    orderedList() {
      const temp = this.items
      return Array.isArray(temp)
        ? temp.sort((a, b) => (parseInt(a.orden) > parseInt(b.orden) ? 1 : -1))
        : []
    },
    menuDegustacion() {
      return this.$store.state.textos.menuDegustacion
    },
    menuDegustacionPrecio() {
      return this.$store.state.textos.menuDegustacionPrecio
    },
    backgroundStyle() {
      return [
        {
          backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2Fmenu-degustacion.jpg?alt=media)`,
        },
      ]
    },
  },
}
</script>
<style lang="scss">
.menu-degustacion-wrapper {
  &:not(.in-modal) {
    @include md {
      width: calc(100vw - 20%);
      position: relative;
      left: calc(-50vw + 50%);
      margin: 0 10%;
    }
  }
}
.menu-degustacion {
  border-radius: 0.7rem;
  margin: 0 auto 2rem auto;
  max-width: 1024px;

  .p-4 {
    padding: 1rem;
  }

  .list-wrapper {
    padding: 24px 0;
  }
  h2.degustacion {
    text-transform: uppercase;
    color: #ffffff;
    font-weight: 400;
    letter-spacing: 0.45rem;
    font-size: 2.1rem;
    padding: 105px 0 0 24px;
    margin: 16px -24px;
    background-position: center;
    background-size: cover;
    background-color: $colorTurq;
    text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
      0px 18px 23px rgba(0, 0, 0, 0.1);
    background-image: url('/img/fotos/carpaccio-640.jpg');
  }
  &.in-modal {
    h2 {
      margin: 0px -36px 16px -36px;
    }
  }
  &:not(.in-modal) {
    @include md {
      box-shadow: var(--shadow-elevation-medium);
    }

    h2.degustacion {
      @include md {
        color: $colorTurq;
        font-size: 1.6rem;
        letter-spacing: 0.25rem;
        padding: 0;
        margin: 24px auto;
        background: none;
        text-align: center;
        text-shadow: none;
      }
    }
  }
  .columns {
    display: flex;
  }
  .left-col {
    padding: 0 1rem;
    margin: 0 1rem;
  }
  .right-col {
    position: relative;
    height: auto;
    left: 0;
    width: 50%;
    background: url('/img/fotos/alcachofas-640.jpg');
    background-position: center;
    background-size: cover;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  &.in-modal {
    .menu-degustacion h2.degustacion {
      @include md {
        width: 100%;
      }
    }
    .left-col {
      @include md {
        width: 100%;
      }
    }
    .right-col {
      @include md {
        display: none;
      }
    }
    .h2 {
      @include md {
        display: none;
      }
    }
  }
}
</style>
