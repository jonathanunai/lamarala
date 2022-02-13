<template>
  <div>
    <h2>Secciones del menú</h2>

    <div class="flex-row">
      <ul>
        <li
          v-for="sec in config.sections"
          :key="sec.key"
          @click="edit(sec.key)"
        >
          {{ sec.key }}: {{ sec.value }} ({{ sec.valueEn }})
        </li>
      </ul>
    </div>
    <div class="admin-button" @click="$emit('cancel')">Volver</div>
    <modal-wrapper
      v-if="showEdit"
      header-title="EDITANDO"
      @toggleModal="showEdit = false"
    >
      <h2>Sección {{ key }}</h2>
      <div class="flex flex-col">
        <div class="flex space-between">
          <label for="zona">Nombre: </label>
          <input v-model="key" type="hidden" name="key" />
          <input
            v-model="section"
            type="text"
            name="section"
            placeholder="Sección"
          />
        </div>
        <div class="flex">
          <label for="zona">Ingés: </label>
          <input v-model="key" type="hidden" name="key" />
          <input
            v-model="sectionEn"
            type="text"
            name="section"
            placeholder="Section"
          />
        </div>
      </div>
      <br />
      <div class="admin-button" @click="save">Guardar</div>
      <div class="admin-button" @click="showEdit = false">Cancelar</div>
    </modal-wrapper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: { sections: [], types: [] },
      showEdit: false,
      key: '',
      section: '',
      sectionEn: '',
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
    edit(val) {
      const section = this.config.sections.filter((el) => el.key === val)[0]
      this.section = section.value
      this.sectionEn = section.valueEn
      this.key = section.key
      this.showEdit = true
    },
    save() {
      const objIndex = this.config.sections.findIndex(
        (obj) => obj.key === this.key
      )
      this.config.sections[objIndex] = {
        key: this.key,
        value: this.section,
        valueEn: this.sectionEn,
      }
      this.store()
    },
    store() {
      this.$firebase
        .firestore()
        .collection('Config')
        .doc('values')
        .update({
          sections: this.config.sections,
        })
        .then(() => {
          this.showEdit = false
          this.section = ''
          this.sectionEn = ''
          this.key = ''
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
  cursor: pointer;
}
li span {
  color: #e57666;
  position: absolute;
  right: -20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
