<template>
  <div class="modal">
    <div class="modal__mask" @click="$emit('toggle')"></div>
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <h2 id="vinos" class="winetitle">Carta de vinos</h2>
          <div class="modal__x" @click="$emit('toggle')">&times;</div>
        </div>
        <div class="modal__body">
          <h2 id="blancos">Blancos</h2>
          <h4>Galicia</h4>
          <menu-list :menu="getList('Blanco', 'Galicia')" />
          <h4>Castilla la Mancha - Castilla y León</h4>
          <menu-list :menu="getList('Blanco', 'CastillaLaMancha')" />
          <menu-list :menu="getList('Blanco', 'CastillaYLeon')" />
          <h4>Cádiz</h4>
          <menu-list :menu="getList('Blanco', 'Cadiz')" />
          <h4>Otras Zonas</h4>
          <menu-list :menu="getList('Blanco', 'Otras')" />
          <h4 class="extra">Internacionales</h4>
          <h4>Francia</h4>
          <menu-list :menu="getList('Blanco', 'Francia')" />
          <h4>Nueva Zelanda</h4>
          <menu-list :menu="getList('Blanco', 'NuevaZelanda')" />
          <h4>Sudáfrica</h4>
          <menu-list :menu="getList('Blanco', 'Sudáfrica')" />
          <h4>Alemania</h4>
          <menu-list :menu="getList('Blanco', 'Alemania')" />
          <h2 id="espumosos">Espumosos</h2>
          <h4>AOC Champagne</h4>
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
          <h4>Internacionales</h4>
          <h4>Francia</h4>
          <menu-list :menu="getList('Tinto', 'Francia')" />
          <h4>Sudáfrica</h4>
          <menu-list :menu="getList('Tinto', 'Sudáfrica')" />
          <h4>Nueva Zelanda</h4>
          <menu-list :menu="getList('Tinto', 'NuevaZelanda')" />
        </div>
        <div class="modal__footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['vinos'],
  methods: {
    getList(tipo, zona) {
      return this.vinos.filter(
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
  z-index: 2;
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
    top: 2rem;
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
    padding: 1em;
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
    padding-top: 40px;
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
    text-align: left;
    padding: 0.5rem 0;
  }
  .extra {
    text-align: center;
  }
}
</style>
