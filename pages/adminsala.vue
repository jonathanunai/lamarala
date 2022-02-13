<template>
  <div :class="isConfig ? 'config' : ''" class="page-container admin-page">
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

    <div v-if="!user" class="login"><form-login /></div>

    <div v-else class="logged-in">
      <div class="admin-header">
        <div
          class="admin-button config-button"
          :class="show === 'config' ? 'active' : ' '"
          @click="showThis('config')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: #f3f9f9"
          >
            <path
              d="M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z"
            ></path>
          </svg>
        </div>

        <h3>
          Identificado como: {{ user.user.email }}
          <span class="logout" @click="logout">[desconectar]</span>
        </h3>
        <h4>La Mar Salá</h4>
        <h1>Zona de adminitración</h1>
        <h4 v-if="editing">Creando / Editando</h4>

        <template v-else-if="!isConfig">
          <div class="admin-buttons">
            <div
              class="admin-button"
              :class="!wine ? 'active' : ' '"
              @click="showMenu"
            >
              Carta
            </div>
            <div
              class="admin-button"
              :class="tipo === 'Tinto' && wine ? 'active' : ' '"
              @click="showWine('Tinto')"
            >
              Tintos
            </div>
            <div
              class="admin-button"
              :class="tipo === 'Blanco' && wine ? 'active' : ' '"
              @click="showWine('Blanco')"
            >
              Blancos
            </div>
            <div
              class="admin-button"
              :class="tipo === 'Espumoso' && wine ? 'active' : ' '"
              @click="showWine('Espumoso')"
            >
              Espumosos
            </div>
          </div>
          <div class="admin-buttons">
            <div class="admin-button" @click="showForm">Crear nuevo</div>
          </div>
        </template>
        <template v-else>
          <div>
            <div class="admin-buttons">
              <div class="admin-button" @click="showThis('sections')">
                Secciones del menú
              </div>
              <div class="admin-button" @click="showThis('zones')">Zonas</div>
              <div class="admin-button" @click="showThis('texts')">
                Textos web
              </div>
              <div class="admin-button" @click="showThis('images')">
                Imagenes
              </div>
              <div class="admin-button" @click="csvExport">
                <download-excel
                  :data="todos"
                  worksheet="Carta"
                  name="carta.xls"
                >
                  Exportar a Excel
                </download-excel>
              </div>
            </div>
          </div>
        </template>
      </div>

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
          <div v-else-if="!isConfig" class="lists">
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
                  @editItem="editItem"
                  @changeItemStatus="changeItemStatus"
                  @confirmDeleteItem="confirmDeleteItem"
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
                <h2>
                  {{ sectionName(id) }}
                </h2>
                <admin-list
                  :key="id + counter"
                  :list="cartaItem"
                  @editItem="editItem"
                  @changeItemStatus="changeItemStatus"
                  @confirmDeleteItem="confirmDeleteItem"
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
<script>
export default {
  layout: 'adminLayer',
  data() {
    return {
      datatest: [],
      menu: [],
      show: 'list',
      confirm: false,
      wine: false,
      tipo: '',
      item: null,
      dataReady: false,
      statusChanging: false,
      config: {},
      carta: {},
      todos: [],
      vino: {},
      counter: 0,
    }
  },
  computed: {
    user() {
      return this.dataReady && this.$store.state.user
    },
    showWineorFood() {
      return this.wine ? this.vino[this.tipo] : this.carta
    },
    orderedMenu() {
      const temp = this.menu
      return temp.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      )
    },
    editing() {
      return (
        this.show === 'form' ||
        this.show === 'texts' ||
        this.show === 'images' ||
        this.show === 'sections' ||
        this.show === 'zones'
      )
    },
    isConfig() {
      return this.show === 'config'
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.dataReady = false
      this.config = {}
      this.carta = {}
      this.vino = {}
      this.$firebase
        .firestore()
        .collection('Config')
        .doc('values')
        .get()
        .then((doc) => {
          this.config = doc.data()
        })

      this.$firebase
        .firestore()
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const newItem = { id: doc.id, ...doc.data() }
            // this.menu.push({ id: doc.id, ...doc.data() })
            if (doc.data().tipo === 'Vino') {
              if (
                !Object.prototype.hasOwnProperty.call(
                  this.vino,
                  doc.data().tipovino
                )
              ) {
                this.vino[doc.data().tipovino] = {}
              }
              if (
                !Object.prototype.hasOwnProperty.call(
                  this.vino[doc.data().tipovino],
                  doc.data().zona
                )
              ) {
                this.vino[doc.data().tipovino][doc.data().zona] = []
              }

              this.vino[doc.data().tipovino][doc.data().zona].push(newItem)
            } else {
              if (
                !Object.prototype.hasOwnProperty.call(
                  this.carta,
                  doc.data().tipo
                )
              ) {
                this.carta[doc.data().tipo] = []
              }
              this.carta[doc.data().tipo].push(newItem)
            }
            this.todos.push(newItem)
          })
          this.dataReady = true
        })
    },
    changeItemStatus(item) {
      item.isActive = item.isActive !== 0 ? 0 : 1
      this.statusChanging = true
      this.$firebase
        .firestore()
        .collection('Menu')
        .doc(item.id)
        .update({
          isActive: item.isActive,
        })
        .then(() => {
          this.statusChanging = false
          this.counter++
        })
    },
    showForm() {
      this.show = 'form'
      this.$store.dispatch('setEditItem', false)
    },
    showWine(tipo) {
      this.wine = true
      this.tipo = tipo
    },
    showThis(me) {
      if (me === 'config' && this.show === me) this.show = 'list'
      else this.show = me
    },
    showMenu() {
      this.wine = false
    },
    added() {
      this.loadData()
      this.show = 'empty'

      setTimeout(() => {
        this.show = 'list'
      }, 300)
    },
    logout() {
      this.$store.dispatch('logout')
    },
    cancelDel() {
      this.confirm = false
      this.item = null
    },
    confirmDeleteItem(item) {
      this.confirm = true
      this.item = item
    },
    editItem(item) {
      this.$store.dispatch('setEditItem', item)
      this.show = 'form'
      this.counter++
    },
    deleteItem() {
      this.$firebase
        .firestore()
        .collection('Menu')
        .doc(this.item.id)
        .delete()
        .then(() => {
          this.confirm = false
          this.item = null
          this.loadData()
        })
      this.counter++
    },
    csvExport() {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        this.carta.Entrada.map((item) => Object.values(item).join(';')),
      ]
        .join('\r\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      this.datatest = data
      link.setAttribute('href', csvContent)
      link.setAttribute('download', 'export.csv')
      // link.click()
    },
    sectionName(sec) {
      const section = this.config.sections.filter(
        (el) => el.key === sec.slice(-1)
      )[0]
      return section ? section.value : sec
    },
  },
}
</script>
<style lang="scss">
.page-container {
  padding: 16px 24px;
  background: $colorGrey;
  color: $colorLight;
  width: 100%;
  min-height: 100vh;
  .logout {
    cursor: pointer;
  }
}
.page-container .overlay {
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-container .overlay.loaded {
  display: none;
}
.admin-page {
  h1 {
    font-size: 1.2rem;
    padding-bottom: 0.7rem;
  }
  h2 {
    padding: 16px 0;
    margin: 24px auto 16px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
  }
  .yellow {
    font-weight: bold;
    color: #d0c000;
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
  .admin-header {
    padding: 32px 0 0 0;
    display: flex;
    text-align: center;
    flex-direction: column;
    h3 {
      color: $colorLight;
      padding-bottom: 10px;
      font-size: 0.75rem;
      position: absolute;
      left: 12px;
      top: 8px;
    }
  }
  .admin-buttons-wrapper {
    margin: 12px 0;
  }
  .admin-buttons {
    display: flex;
    justify-content: center;
    min-height: 47px;
  }
  .admin-button {
    padding: 8px 16px;
    background: $colorTurq;
    border: 1px solid $colorLight;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    width: fit-content;
    margin: 0.35rem;
    &:hover {
      box-shadow: 0 0.55rem 0.9rem -0.75rem hsl(178, 75%, 72%);
    }
    &.active {
      background: $colorDark;
      box-shadow: 0 0.55rem 0.9rem -0.75rem hsl(178, 75%, 72%);
    }
  }
  &.config .admin-button {
    background: #8b0000;
  }
  .config-button {
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 4px 6px;
    line-height: 0;
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
  .container-admin {
    max-width: 740px;
    margin: 0 auto;
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
  .home-enter-active,
  .home-leave-active {
    transition: opacity 0.5s;
  }
  .home-enter,
  .home-leave-active {
    opacity: 0;
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
