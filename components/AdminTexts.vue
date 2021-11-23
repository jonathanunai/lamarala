<template>
  <div class="textos">
    <h3>Textos en la web</h3>
    <client-only>
      <div class="label">Introducción de la página</div>
      <tiptap v-model="textos.introWeb" />
      <div class="label">Introducción para el menú Degustación</div>
      <tiptap v-model="textos.menuDegustacion" />
      <div class="label">Precio para el menú Degustación</div>
      <tiptap v-model="textos.menuDegustacionPrecio" />
      <div class="label">Horario de comidas</div>
      <input v-model="textos.horarioComidas" type="text" />
      <div class="label">Horario de cenas</div>
      <input v-model="textos.horarioCenas" type="text" />
    </client-only>
    <div class="flex-row">
      <div class="admin-button" @click="save">Guardar</div>
      <div class="admin-button" @click="$emit('cancel')">Cancelar</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textos: {
        introWeb: '',
        menuDegustacion: '',
        menuDegustacionPrecio: '',
        horarioComidas: '',
        horarioCenas: '',
      },
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$firebase
        .firestore()
        .collection('Textos')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (!Object.prototype.hasOwnProperty.call(this.textos, doc.id))
              return
            this.textos[doc.id] = doc.data().value
          })
        })
    },
    save() {
      Object.keys(this.textos).forEach((key) => {
        this.$firebase
          .firestore()
          .collection('Textos')
          .doc(key)
          .set({ value: this.textos[key] })
          .then(() => this.$emit('added'))
      })
    },
  },
}
</script>
<style lang="scss">
.textos {
  padding: 1rem 0;
  .label {
    margin-top: 2rem;
  }
}
.admin-page {
  .textos {
    input {
      background: #727277;
      color: #f3f9f9;
      border: 1px solid;
      padding: 1rem;
      margin: 1rem 0;
    }
  }
}
</style>
