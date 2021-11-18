<template>
  <div class="vinos">
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
    <h4 v-if="getList('Blanco', 'EstadosUnidos').length > 0">Estados Unidos</h4>
    <menu-list :menu="getList('Blanco', 'EstadosUnidos')" />

    <h4 v-if="getList('Blanco', 'NuevaZelanda').length > 0">Nueva Zelanda</h4>
    <menu-list :menu="getList('Blanco', 'NuevaZelanda')" />
    <h4 v-if="getList('Blanco', 'Sudáfrica').length > 0">Sudáfrica</h4>
    <menu-list :menu="getList('Blanco', 'Sudáfrica')" />
    <h4 v-if="getList('Blanco', 'Alemania').length > 0">Alemania</h4>
    <menu-list :menu="getList('Blanco', 'Alemania')" />
    <h2 id="espumosos">Espumosos</h2>
    <h4 v-if="getList('Espumoso', 'Champagne').length > 0">AOC Champagne</h4>
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

    <h4 v-if="getList('Tinto', 'EstadosUnidos').length > 0">Estados Unidos</h4>
    <menu-list :menu="getList('Tinto', 'EstadosUnidos')" />

    <h4 v-if="getList('Tinto', 'Sudáfrica').length > 0">Sudáfrica</h4>
    <menu-list :menu="getList('Tinto', 'Sudáfrica')" />

    <h4 v-if="getList('Tinto', 'NuevaZelanda').length > 0">Nueva Zelanda</h4>
    <menu-list :menu="getList('Tinto', 'NuevaZelanda')" />
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
