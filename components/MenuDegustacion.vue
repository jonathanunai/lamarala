<template>
  <div class="menu-degustacion">
    <div class="columns">
      <div class="left-col">
        <h2 class="degustacion">Menú degustación</h2>
        <p>
          Disfrute de nuestro menú degustación de Navidad. Estará disponible del
          2 de Diciembre hasta el 6 de Enero, ambos inclusive.
        </p>
        <p>El menú se servirá a mesa completa (todos los comensales).</p>
        <menu-list :menu="items" />
        <p>Todo por 45€ (iva incluido)</p>
      </div>
      <div class="right-col"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['items'],
  data() {
    return {}
  },
  created() {},
}
</script>
<style lang="scss">
.menu-degustacion {
  box-shadow: var(--shadow-elevation-medium);

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

    @include md {
      color: $colorTurq;
      font-size: 1.6rem;
      letter-spacing: 0.25rem;
      padding: 0;
      margin: 24px auto;
      background: none;
      text-align: left;
      text-shadow: none;
    }
  }
  .columns {
    display: flex;
  }
  .left-col {
    padding: 0;
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
  }
}
</style>
