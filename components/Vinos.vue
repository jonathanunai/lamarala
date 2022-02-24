<template>
  <div class="vinos">
    <h2 id="blancos">Blancos</h2>
    <div v-for="zone in zones" :key="`${zone.key}-blanco`">
      <template v-if="getList('Blanco', zone.value).length > 0">
        <h4>{{ zone.value }}</h4>
        <menu-list :menu="getList('Blanco', zone.value)" :order="'no'" />
      </template>
    </div>
    <h2 id="espumosos">Espumosos</h2>
    <div v-for="zone in zones" :key="`${zone.key}-espumoso`">
      <template v-if="getList('Espumoso', zone.value).length > 0">
        <h4>{{ zone.value }}</h4>
        <menu-list :menu="getList('Espumoso', zone.value)" :order="'no'" />
      </template>
    </div>
    <h2 id="tintos">Tintos</h2>
    <div v-for="zone in zones" :key="`${zone.key}-tinto`">
      <template v-if="getList('Tinto', zone.value).length > 0">
        <h4>{{ zone.value }}</h4>
        <menu-list :menu="getList('Tinto', zone.value)" :order="'no'" />
      </template>
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
  props: ['vinos', 'zones'],
  computed: {
    orderedList() {
      return Array.isArray(this.vinos) ? [...this.vinos].sort(compare) : []
    },
  },
  methods: {
    getList(tipo, zona) {
      return Array.isArray(this.orderedList)
        ? this.orderedList.filter(
            (item) => item.tipovino === tipo && item.zona === zona
          )
        : []
    },
  },
}
</script>
