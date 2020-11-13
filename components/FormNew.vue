<template>
  <div>
    <form action="">
      <input v-model="model.nombre" type="text" placeholder="Nombre" />
      <input
        v-model="model.desc"
        type="text"
        class="desc"
        placeholder="Descripcón"
      />
      <input v-model="model.precio" type="text" placeholder="Precio" />
      <select v-model="model.tipo">
        <option value="Entrada">Entrada</option>
        <option value="Pescado">Pescado</option>
        <option value="Arroz">Arroz</option>
        <option value="Carne">Carne</option>
        <option value="Postre">Postre</option>
        <option value="Vino">Vino</option>
      </select>
      <input type="submit" value="Guardar" @click.prevent="addDocument" />
    </form>
    <div class="admin-button" @click="$emit('cancel')">Cancelar</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        nombre: '',
        desc: '',
        precio: '',
        tipo: '',
      },
    }
  },
  methods: {
    async addDocument() {
      const db = this.$firebase.firestore()
      // Add a new document with a generated id.
      const res = await db.collection('Menu').add({
        ...this.model,
      })

      console.log('Added document with ID: ', res.id)
      // [END add_document]

      console.log('Add: ', res)
    },
  },
}
</script>
<style lang="scss"></style>
