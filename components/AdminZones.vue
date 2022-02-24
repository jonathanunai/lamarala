<template>
  <div>
    <h2>Lista de zonas para el vino</h2>
    <div class="admin-button" @click="showEdit = true">Nuevo</div>

    <div class="flex-row">
      <ul>
        <li v-for="zona in config.zones" :key="zona.key">
          {{ zona.order }} {{ zona.value }}
          <span @click="del(zona.key)">[x]</span>
        </li>
      </ul>
    </div>
    <div class="admin-button" @click="$emit('cancel')">Volver</div>
    <modal-wrapper
      v-if="showEdit"
      header-title="EDITANDO"
      @toggleModal="showEdit = false"
    >
      <br />
      <label for="zona">Zona: </label>
      <input v-model="zone" type="text" name="zone" placeholder="Zona" />
      <input v-model="order" type="text" name="order" placeholder="Posicion" />
      <div class="admin-button" @click="save">Guardar</div>
      <div class="admin-button" @click="showEdit = false">Cancelar</div>
    </modal-wrapper>
  </div>
</template>
<script>
const slugify = require('slugify')

export default {
  data() {
    return {
      config: { zones: [], types: [] },
      showEdit: false,
      zone: '',
      order: '',
    }
  },
  created() {
    this.$firebase
      .firestore()
      .collection('Config')
      .doc('values')
      .get()
      .then((doc) => {
        this.config = doc.data()
      })
  },
  methods: {
    del(val) {
      this.config.zones = this.config.zones.filter((el) => el.key !== val)
      this.store()
    },
    save() {
      this.config.zones.push({
        key: slugify(this.zone),
        value: this.zone,
        order: this.order,
      })
      this.config.zones = this.config.zones.sort((a, b) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      )
      this.store()
    },
    store() {
      this.$firebase
        .firestore()
        .collection('Config')
        .doc('values')
        .update({
          zones: this.config.zones,
        })
        .then(() => {
          this.showEdit = false
          this.zone = ''
          this.order = ''
        })
    },
  },
}
</script>
<style lang="scss" scoped>
label {
  padding-bottom: 1rem;
}
li {
  position: relative;
}
li span {
  color: #e57666;
  position: absolute;
  right: -20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
