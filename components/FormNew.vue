<template>
  <div class="new-form">
    <form action="">
      <select v-model="model.tipo">
        <option
          v-for="section in config.sections"
          :key="`section${section.key}`"
          :value="`section${section.key}`"
        >
          {{ section.value }}
        </option>
        <option disabled>──────────</option>
        <option value="Vino">Vino</option>
        <option value="Degustacion">Plato degustación</option>
        <option value="Pan">Servicio de pan</option>
      </select>

      <input v-model="model.nombre" type="text" placeholder="Nombre" />
      <input v-model="model.nombreEn" type="text" placeholder="Nombre Inglés" />
      <br />
      <input
        v-model="model.desc"
        type="text"
        class="desc"
        placeholder="Descripcón"
      />
      <input
        v-model="model.descEn"
        type="text"
        class="desc"
        placeholder="Descripcón Inglés"
      />
      <input
        v-if="model.tipo !== 'Degustacion'"
        v-model="model.precio"
        type="text"
        placeholder="Precio"
      />
      <input
        v-model="model.orden"
        type="text"
        placeholder="Orden"
        style="width: 1rem"
      />
      <div v-if="model.tipo === 'Vino'" class="seccion-vino">
        <select v-model="model.tipovino">
          <option value="Blanco">Blanco</option>
          <option value="Espumoso">Espumoso</option>
          <option value="Tinto">Tinto</option>
          <option value="Otros">Otros</option>
        </select>
        <select v-model="model.zona">
          <option
            v-for="zona in config.zones"
            :key="zona.key"
            :value="zona.value"
          >
            {{ zona.value }}
          </option>
        </select>
      </div>
      <br />

      <ul>
        <li v-for="alergic in alergenics" :key="alergic">
          <img :src="`/img/icon${alergic}.png`" :alt="alergic" width="24px" />
          <input v-model="model[alergic]" type="checkbox" :value="alergic" />
        </li>
      </ul>

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
      config: { zones: [], types: [], sections: [] },
      id: '',
      errorMsg: '',
      model: {
        nombre: '',
        nombreEn: '',
        desc: '',
        descEn: '',
        precio: '',
        orden: '',
        tipo: '',
        zona: '',
        tipovino: '',
        isActive: 1,
        alergenics: [],
      },
      alergenics: [
        'Lupin',
        'Celery',
        'Peanut',
        'Mustard',
        'Sesame',
        'Sulfur',
        'Mollusks',
        'Crustacean',
        'Peel',
        'Soy',
        'Fish',
        'Dairy',
        'Egg',
        'Gluten',
      ],
    }
  },
  computed: {
    editItem() {
      return this.$store.state.editItem
    },
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
.new-form {
  select {
    width: 100%;
    margin: 0.35rem;
  }
  ul {
    width: 100%;
    margin: 0.35rem;
    display: flex;
    > * {
      margin-right: 4px;
    }
  }
}
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
