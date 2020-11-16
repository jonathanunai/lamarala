<template>
  <div class="container menu-page">
    <div class="left-col">
      <h2>Entrantes para compartir</h2>
      <ul>
        <li v-for="entrada in menu.Entrada" :key="entrada.nombre">
          <div class="plato">
            <span>{{ entrada.nombre }}</span> {{ entrada.desc }}
          </div>
          <div class="precio">{{ entrada.precio }}</div>
        </li>
      </ul>
    </div>
    <div class="right-col">
      {{ menu }}
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, params, error }) {
    const db = app.$firebase.firestore()
    const menu = { Entrada: [], Pescado: [], Carne: [], Arroz: [] }
    try {
      await db
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.data().tipo)
            if (doc.data().tipo) menu[doc.data().tipo].push(doc.data())
          })
        })

      return { menu }
    } catch (e) {
      error({ statusCode: 404, message: 'Menu not found' })
    }
  },
  data() {
    return {
      menu: [],
    }
  },
}
</script>
<style lang="scss">
.container {
  > * {
    width: 100%;
  }
}
.menu-page {
  h2 {
    text-transform: uppercase;
    color: $colorTurq;
    font-weight: 400;
    margin-bottom: 24px;
    letter-spacing: 0.3rem;
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style-type: none;
      padding: 0;
      padding-bottom: 12px;
      margin: 0;
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      color: $colorGrey;
      font-weight: 400;
    }
  }
  .left-col {
    padding: 0 48px;
  }
  .plato {
    text-align: left;
    max-width: 70%;
    span {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  .precio {
    font-weight: bold;
  }
}
</style>
