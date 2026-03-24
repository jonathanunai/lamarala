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
    <modal-wrapper
      v-if="showEdit"
      header-title="EDITANDO"
      :close="() => (showEdit = false)"
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
<script setup>
import { ref } from 'vue'
import slugify from 'slugify'
import { useNuxtApp } from '#app'

const emit = defineEmits(['cancel'])

const { $firebase } = useNuxtApp()

const config = ref({ zones: [], types: [] })
const showEdit = ref(false)
const zone = ref('')
const order = ref('')

$firebase
  .firestore()
  .collection('Config')
  .doc('values')
  .get()
  .then((doc) => {
    config.value = doc.data()
  })

function del(val) {
  config.value.zones = config.value.zones.filter((el) => el.key !== val)
  saveToFirestore()
}

function save() {
  config.value.zones.push({
    key: slugify(zone.value),
    value: zone.value,
    order: order.value,
  })
  config.value.zones = config.value.zones.sort((a, b) =>
    a.order > b.order ? 1 : b.order > a.order ? -1 : 0,
  )
  saveToFirestore()
}

function saveToFirestore() {
  $firebase
    .firestore()
    .collection('Config')
    .doc('values')
    .update({ zones: config.value.zones })
    .then(() => {
      showEdit.value = false
      zone.value = ''
      order.value = ''
    })
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
