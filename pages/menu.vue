<template>
  <div class="container menu-page">
    <div class="left-col">
      <logo />
      <ul class="menu-links">
        <li v-scroll-to="'#Entradas'">Entradas para compartir</li>
        <li v-scroll-to="'#Mariscos'">Mariscos</li>
        <li v-scroll-to="'#Pescado'">Plato pricipal</li>
        <ul>
          <li v-scroll-to="'#Pescado'">Pescados y arroz</li>
          <li v-scroll-to="'#Carne'">Carne</li>
        </ul>
      </ul>

      <h2 id="Entradas">Entradas para compartir</h2>
      <menu-list :menu="menu.Entrada" />
      <h2 id="Mariscos">Mariscos</h2>
      <menu-list :menu="menu.Entrada" />
      <h2 id="Pescado">Pescado y Arroz</h2>
      <menu-list :menu="menu.Arroz" />
      <menu-list :menu="menu.Pescado" />
      <h2 id="Carne">Carnes</h2>
      <menu-list :menu="menu.Carne" />
    </div>
    <div class="right-col"></div>
  </div>
</template>
<script>
import MenuList from '~/components/MenuList.vue'
export default {
  components: { MenuList },
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
.menu-page {
  justify-content: left;
  .logo-wrapper {
    width: 100%;
    padding: 16px;
    text-align: left;
    display: flex;
    justify-content: left;
    img {
      width: 220px;
    }
  }
  .menu-links {
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      text-align: left;
      text-transform: uppercase;
      margin-bottom: 12px;
      padding-left: 16px;
      border-left: 3px solid $colorTurq;
      letter-spacing: 0.2rem;
      color: $colorGrey;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    ul {
      margin: 0;
      list-style-type: none;
      li {
        text-transform: none;
        border: 0;
      }
    }
  }
  h2 {
    text-transform: uppercase;
    color: $colorTurq;
    font-weight: 400;
    margin: 24px auto;
    letter-spacing: 0.25rem;
    font-size: 1.5rem;
  }
  .left-col {
    padding: 0 78px;
    width: 50%;
  }
  .right-col {
    position: fixed;
    width: 50%;
    height: 100vh;
    left: 50%;
    top: 0;
    background: url('/img/Pez-mantequilla.jpg');
    background-position: center;
    background-size: cover;
  }
}
</style>
