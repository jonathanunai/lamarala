<template>
  <div class="modal">
    <div class="modal__mask" @click="$emit('toggleModal')"></div>
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <h2 id="vinos" class="winetitle">Carta de vinos</h2>
          <div class="modal__x" @click="$emit('toggleModal')">&times;</div>
        </div>
        <div class="modal__body">
          <h2 id="blancos">Blancos</h2>
          <h4>Galicia</h4>
          <menu-list :menu="getList('Blanco', 'Galicia')" />
          <h4>Rioja</h4>
          <menu-list :menu="getList('Blanco', 'Rioja')" />
          <h4>Castilla la Mancha - Castilla y León</h4>
          <menu-list :menu="getList('Blanco', 'CastillaLaMancha')" />
          <menu-list :menu="getList('Blanco', 'CastillaYLeon')" />
          <h4>Cádiz</h4>
          <menu-list :menu="getList('Blanco', 'Cadiz')" />
          <h4>Otras Zonas</h4>
          <menu-list :menu="getList('Blanco', 'Otras')" />
          <h4 class="extra">Internacionales</h4>
          <h4 v-if="getList('Blanco', 'Francia').length > 0">Francia</h4>
          <menu-list :menu="getList('Blanco', 'Francia')" />
          <h4 v-if="getList('Blanco', 'Italia').length > 0">Italia</h4>
          <menu-list :menu="getList('Blanco', 'Italia')" />
          <h4 v-if="getList('Blanco', 'EstadosUnidos').length > 0">
            Estados Unidos
          </h4>
          <menu-list :menu="getList('Blanco', 'EstadosUnidos')" />

          <h4 v-if="getList('Blanco', 'NuevaZelanda').length > 0">
            Nueva Zelanda
          </h4>
          <menu-list :menu="getList('Blanco', 'NuevaZelanda')" />
          <h4 v-if="getList('Blanco', 'Sudáfrica').length > 0">Sudáfrica</h4>
          <menu-list :menu="getList('Blanco', 'Sudáfrica')" />
          <h4 v-if="getList('Blanco', 'Alemania').length > 0">Alemania</h4>
          <menu-list :menu="getList('Blanco', 'Alemania')" />
          <h2 id="espumosos">Espumosos</h2>
          <h4 v-if="getList('Espumoso', 'Champagne').length > 0">
            AOC Champagne
          </h4>
          <menu-list :menu="getList('Espumoso', 'Champagne')" />

          <h2 id="tintos">Tintos</h2>

          <h4>Castilla la Mancha</h4>
          <menu-list :menu="getList('Tinto', 'CastillaLaMancha')" />
          <h4>Castilla y León</h4>
          <menu-list :menu="getList('Tinto', 'CastillaYLeon')" />
          <h4>Rioja</h4>
          <menu-list :menu="getList('Tinto', 'Rioja')" />
          <h4>Otras zonas</h4>
          <menu-list :menu="getList('Tinto', 'Otras')" />

          <h4 class="extra">Internacionales</h4>

          <h4>Francia</h4>
          <menu-list :menu="getList('Tinto', 'Francia')" />

          <h4 v-if="getList('Tinto', 'Italia').length > 0">Italia</h4>
          <menu-list :menu="getList('Tinto', 'Italia')" />

          <h4 v-if="getList('Tinto', 'EstadosUnidos').length > 0">
            Estados Unidos
          </h4>
          <menu-list :menu="getList('Tinto', 'EstadosUnidos')" />

          <h4 v-if="getList('Tinto', 'Sudáfrica').length > 0">Sudáfrica</h4>
          <menu-list :menu="getList('Tinto', 'Sudáfrica')" />

          <h4 v-if="getList('Tinto', 'NuevaZelanda').length > 0">
            Nueva Zelanda
          </h4>
          <menu-list :menu="getList('Tinto', 'NuevaZelanda')" />
        </div>
        <div class="modal__footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
function compare(a, b) {
  const priceA = parseInt(a.precio.replace(',', '.'))
  const priceB = parseInt(b.precio.replace(',', '.'))
  if (priceA < priceB) {
    return -1
  }
  if (priceA > priceB) {
    return 1
  }
  return 0
}

export default {
  // eslint-disable-next-line
  props: ['vinos'],
  computed: {
    orderedList() {
      return [...this.vinos].sort(compare)
    },
  },
  methods: {
    getList(tipo, zona) {
      return this.orderedList.filter(
        (item) => item.tipovino === tipo && item.zona === zona
      )
    },
  },
}
</script>
<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  &__mask {
    background: rgba(#000000, 0.65);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  &__wrapper {
    position: fixed;
    top: 1.2rem;
    width: 95vmin;
    height: 95vh;
    background: #fff;
    color: #333;
    display: flex;
    border-radius: 0.2em;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2), 0 1em 2em -1em;
    @include md {
      width: 65vmin;
      min-height: 35vmin;
    }
  }
  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__body {
    flex: 1;
    padding: 0 1.7em;
    overflow: auto;
  }
  &__footer {
    padding: 1em;
    text-align: right;
  }
  &__x {
    cursor: pointer;
    position: absolute;
    right: 15px;
    color: #ffffff;
    font-size: 3rem;
  }
  h2.winetitle {
    width: 100%;
    margin: 0;
    background: $colorTurq;
    padding-top: 80px;
    background-image: url('/img/fotos/vinos-640.jpg');
    background-size: cover;

    @include md {
      color: #ffffff;
      padding-left: 1rem;
    }
  }
  h2 {
    background: $colorTurq;
    padding: 25px 0;

    @include md {
      color: #ffffff;
      padding-left: 1rem;
    }
  }
  h3 {
    border-bottom: 2px solid $colorTurq;
    padding: 0.5rem;
    padding-top: 2rem;
  }
  h4 {
    color: #008d8a;
    font-size: 1.23rem;
    letter-spacing: 0.25rem;
    padding: 0;
    padding-top: 20px;
    margin: 6px auto;
    background: none;
    text-align: left;
    text-shadow: none;
    text-transform: uppercase;
    font-weight: 400;
  }
  .extra {
    text-align: center;
  }
}
</style>
