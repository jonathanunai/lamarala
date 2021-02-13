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
      <div v-if="model.tipo === 'Vino'" class="seccion-vino">
        <select v-model="model.tipovino">
          <option value="Blanco">Blanco</option>
          <option value="Espumoso">Espumoso</option>
          <option value="Tinto">Tinto</option>
          <option value="Otros">Otros</option>
        </select>
        <select v-model="model.zona">
          <option value="Cadiz">Cádiz</option>
          <option value="Champagne">AOC Champagne</option>
          <option value="CastillaLaMancha">Castilla La Mancha</option>
          <option value="CastillaYLeon">Castilla Y León</option>
          <option value="Galicia">Galicia</option>
          <option value="Rioja">Rioja</option>
          <option value="Alemania">Alemania</option>
          <option value="Francia">Francia</option>
          <option value="NuevaZelanda">Nueva Zelanda</option>
          <option value="Sudáfrica">Sudáfrica</option>
          <option value="Otras">Otras Zonas</option>
        </select>
      </div>
      <div class="error-msg">{{ errorMsg }}</div>
      <input type="submit" value="Guardar" @click.prevent="addDocument" />
    </form>
    <div class="admin-button" @click="$emit('cancel')">Cancelar</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      errorMsg: '',
      model: {
        nombre: '',
        desc: '',
        precio: '',
        tipo: '',
        zona: '',
        tipovino: '',
        isActive: 1,
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
      if (!this.model.tipo) {
        this.errorMsg = '¡Selecciona un tipo!'
        return
      }
      this.errorMsg = ''

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
<style lang="scss">
.seccion-vino {
  padding: 8px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px #fff solid;
  border-radius: 1rem;
  > * {
    margin: 4px 0;
  }
}
.error-msg {
  color: white;
  font-weight: bold;
}
</style>
