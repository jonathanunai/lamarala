<template>
  <div class="page-container admin-page">
    <div class="overlay" :class="dataReady ? 'loaded' : 'loading'">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <transition name="bounce">
      <div v-if="statusChanging" class="status-changing"></div>
    </transition>

    <div class="wrapper">
      <aside class="admin-sidebar">
        <div class="sidebar-brand">
          <span>La Mar Salá</span>
        </div>

        <nav class="sidebar-nav">
          <p class="sidebar-section-label">Carta</p>
          <div
            class="admin-button"
            :class="!wine && show === 'list' ? 'active' : ''"
            @click="showMenu"
          >
            Todos
          </div>
          <div
            class="admin-button"
            :class="tipo === 'Tinto' && wine ? 'active' : ''"
            @click="showWine('Tinto')"
          >
            Tintos
          </div>
          <div
            class="admin-button"
            :class="tipo === 'Blanco' && wine ? 'active' : ''"
            @click="showWine('Blanco')"
          >
            Blancos
          </div>
          <div
            class="admin-button"
            :class="tipo === 'Espumoso' && wine ? 'active' : ''"
            @click="showWine('Espumoso')"
          >
            Espumosos
          </div>
          <div class="admin-button" @click="showForm">+ Crear nuevo</div>

          <p class="sidebar-section-label">Configuración</p>
          <div
            class="admin-button"
            :class="show === 'sections' ? 'active' : ''"
            @click="showThis('sections')"
          >
            Secciones
          </div>
          <div
            class="admin-button"
            :class="show === 'zones' ? 'active' : ''"
            @click="showThis('zones')"
          >
            Zonas
          </div>
          <div
            class="admin-button"
            :class="show === 'texts' ? 'active' : ''"
            @click="showThis('texts')"
          >
            Textos web
          </div>
          <div
            class="admin-button"
            :class="show === 'images' ? 'active' : ''"
            @click="showThis('images')"
          >
            Imágenes
          </div>
        </nav>

        <div class="sidebar-footer">
          <span class="user-email">{{ store.user?.user?.email }}</span>
          <div class="admin-button logout-button" @click="logout">
            Desconectar
          </div>
        </div>
      </aside>

      <div class="container-admin">
        <transition name="bounce" mode="out-in">
          <form-new
            v-if="show === 'form'"
            key="form"
            :item="item"
            @cancel="showThis('list')"
            @added="added"
          />
          <admin-texts
            v-else-if="show === 'texts'"
            @cancel="showThis('config')"
            @added="added"
          />
          <admin-images
            v-else-if="show === 'images'"
            @cancel="showThis('config')"
            @added="added"
          />
          <admin-zones
            v-else-if="show === 'zones'"
            :zones="config.zones"
            @cancel="showThis('config')"
            @added="added"
          />
          <admin-sections
            v-else-if="show === 'sections'"
            :sections="config.sections"
            @cancel="showThis('config')"
            @added="added"
          />
          <div v-else-if="show === 'empty'"></div>
          <div v-else class="lists">
            <template v-if="wine">
              <div
                v-for="(listavinos, zona) in showWineorFood"
                :key="zona"
                :value="zona"
                class="list"
              >
                <h5>{{ zona }}</h5>
                <admin-list
                  :key="tipo + zona + counter"
                  :list="listavinos"
                  @edit-item="editItem"
                  @change-item-status="changeItemStatus"
                  @confirm-delete-item="confirmDeleteItem"
                />
              </div>
            </template>
            <template v-else>
              <div
                v-for="(cartaItem, id) in showWineorFood"
                :key="id"
                :value="id"
                class="list"
              >
                <h2>{{ sectionName(id) }}</h2>
                <admin-list
                  :key="id + counter"
                  :list="cartaItem"
                  @edit-item="editItem"
                  @change-item-status="changeItemStatus"
                  @confirm-delete-item="confirmDeleteItem"
                />
              </div>
            </template>
          </div>
        </transition>
      </div>

      <div v-if="confirm" class="confirm-wrapper">
        <div class="confirm">
          ¿Seguro que quieres borrar {{ item.nombre }}?
          <div class="flex-row">
            <div class="admin-button" @click="deleteItem">Borrar</div>
            <div class="admin-button" @click="cancelDel">Cancelar</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '~/stores/app'
import { useNuxtApp } from '#app'

definePageMeta({
  layout: 'admin-layer',
  middleware: 'auth',
})

const store = useAppStore()
const { $firebase } = useNuxtApp()

const dataReady = ref(false)
const statusChanging = ref(false)
const show = ref('list')
const confirm = ref(false)
const wine = ref(false)
const tipo = ref('')
const item = ref(null)
const config = ref({})
const carta = ref({})
const vino = ref({})
const counter = ref(0)

const showWineorFood = computed(() =>
  wine.value ? vino.value[tipo.value] : carta.value,
)

function loadData() {
  dataReady.value = false
  config.value = {}
  carta.value = {}
  vino.value = {}

  $firebase
    .firestore()
    .collection('Config')
    .doc('values')
    .get()
    .then((doc) => {
      config.value = doc.data()
    })

  $firebase
    .firestore()
    .collection('Menu')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const newItem = { id: doc.id, ...doc.data() }
        if (doc.data().tipo === 'Vino') {
          if (
            !Object.prototype.hasOwnProperty.call(
              vino.value,
              doc.data().tipovino,
            )
          ) {
            vino.value[doc.data().tipovino] = {}
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              vino.value[doc.data().tipovino],
              doc.data().zona,
            )
          ) {
            vino.value[doc.data().tipovino][doc.data().zona] = []
          }
          vino.value[doc.data().tipovino][doc.data().zona].push(newItem)
        } else {
          if (
            !Object.prototype.hasOwnProperty.call(carta.value, doc.data().tipo)
          ) {
            carta.value[doc.data().tipo] = []
          }
          carta.value[doc.data().tipo].push(newItem)
        }
      })
      dataReady.value = true
    })
}

loadData()

function changeItemStatus(i) {
  i.isActive = i.isActive !== 0 ? 0 : 1
  statusChanging.value = true
  $firebase
    .firestore()
    .collection('Menu')
    .doc(i.id)
    .update({ isActive: i.isActive })
    .then(() => {
      statusChanging.value = false
      counter.value++
    })
}

function showForm() {
  show.value = 'form'
  store.setEditItem(false)
}

function showWine(t) {
  wine.value = true
  tipo.value = t
  show.value = 'list'
}

function showThis(me) {
  if (me === 'config' && show.value === me) show.value = 'list'
  else show.value = me
}

function showMenu() {
  wine.value = false
  show.value = 'list'
}

function added() {
  loadData()
  show.value = 'empty'
  setTimeout(() => {
    show.value = 'list'
  }, 300)
}

async function logout() {
  store.logout()
  await navigateTo('/admin/login')
}

function cancelDel() {
  confirm.value = false
  item.value = null
}

function confirmDeleteItem(i) {
  confirm.value = true
  item.value = i
}

function editItem(i) {
  store.setEditItem(i)
  show.value = 'form'
  counter.value++
}

function deleteItem() {
  $firebase
    .firestore()
    .collection('Menu')
    .doc(item.value.id)
    .delete()
    .then(() => {
      confirm.value = false
      item.value = null
      loadData()
    })
  counter.value++
}

function sectionName(sec) {
  const section = config.value.sections?.find((el) => el.key === sec.slice(-1))
  return section ? section.value : sec
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.page-container {
  background: $colorGrey;
  color: $colorLight;
  width: 100%;
  min-height: 100vh;
}
.page-container .overlay {
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.page-container .overlay.loaded {
  display: none;
}
.admin-page {
  .wrapper {
    display: flex;
    min-height: 100vh;
  }

  .admin-sidebar {
    width: 230px;
    min-width: 230px;
    background: darken($colorGrey, 15%);
    display: flex;
    flex-direction: column;
    padding: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-brand {
    padding: 1.2rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.15rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: $colorLight;
  }

  .sidebar-nav {
    flex: 1;
    padding: 1rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .sidebar-section-label {
    font-size: 0.65rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    opacity: 0.5;
    margin: 0.8rem 0 0.3rem;
    padding: 0;
  }

  .sidebar-footer {
    padding: 1rem 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .user-email {
    font-size: 0.7rem;
    opacity: 0.6;
    word-break: break-all;
  }

  .logout-button {
    background: rgba(255, 100, 100, 0.3) !important;
    &:hover {
      background: rgba(255, 100, 100, 0.4) !important;
    }
  }

  .container-admin {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
  }

  h2 {
    padding: 16px 0;
    margin: 24px auto 16px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
  }
  h5 {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    margin: 28px 0;
    border-bottom: 2px solid;
    text-align: center;
  }
  .status-changing {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
  }
  .flex {
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      border-bottom: 1px dashed #f2f2f2;
      margin-bottom: 12px;
      padding: 6px 0;
    }
    .flex-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.5rem;
      .english {
        color: #ffe4c4;
      }
      .del {
        cursor: pointer;
      }
    }
  }
  .confirm-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    z-index: 100;
    .confirm {
      background: white;
      border-radius: 0.5rem;
      width: 70%;
      max-width: 300px;
      margin: auto;
      margin-top: 40vh;
      color: red;
      padding: 16px 24px;
    }
  }
  .admin-button {
    display: block;
    padding: 8px 16px;
    background: $colorTurq;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    width: 100%;
    font-size: 0.85rem;
    &:hover {
      background: lighten($colorTurq, 5%);
    }
    &.active {
      background: lighten($colorTurq, 10%);
    }
  }
  .strong {
    font-weight: bold;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    & > input {
      flex: 1 1 10ch;
      margin: 0.35rem;
      &.desc {
        flex: 3 1 30ch;
      }
    }
  }
  input,
  select {
    border: none;
    background: hsl(0 0% 93%);
    border-radius: 0.25rem;
    padding: 0.75rem 1rem;
    &[type='submit'] {
      background: $colorTurq;
      color: white;
      &:hover {
        box-shadow: 0 0.75rem 0.5rem -0.5rem hsl(0 50% 80%);
      }
    }
  }
  select {
    height: 100%;
    margin-top: 5px;
  }
  .active-button {
    span {
      width: 16px;
      height: 16px;
      display: block;
      margin-top: 5px;
      margin-right: 7px;
      border-radius: 50%;
      background: #44b773;
    }
    span.not-active {
      background: #b72436;
    }
  }
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  .lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
