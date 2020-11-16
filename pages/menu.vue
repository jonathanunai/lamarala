<template>
  <div class="container">
    {{ menu }}
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, error }) {
    const db = app.$firebase.firestore()
    const menu = []
    try {
      await db
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            menu.push(doc.data())
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
