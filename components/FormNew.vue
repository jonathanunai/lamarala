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
        <option value="Marisco">Marisco</option>
      </select>
      <input type="submit" value="Guardar" @click.prevent="addDocument" />
    </form>
    <div class="admin-button" @click="$emit('cancel')">Cancelar</div>
    {{ editItem }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      model: {
        nombre: '',
        desc: '',
        precio: '',
        tipo: '',
      },
    }
  },
  computed: {
    editItem() {
      return this.$store.state.editItem
    },
  },
  created() {
    if (this.editItem) {
      this.model = { ...this.editItem }
      this.id = this.editItem.id
    }
  },
  methods: {
    addDocument() {
      if (this.id) {
        this.$firebase
          .firestore()
          .collection('Menu')
          .doc(this.id)
          .set({
            ...this.model,
          })
          .then(() => this.$emit('added'))
      } else {
        this.$firebase
          .firestore()
          .collection('Menu')
          .add({
            ...this.model,
          })
          .then(() => this.$emit('added'))
      }
    },
  },
}
</script>
<style lang="scss"></style>
