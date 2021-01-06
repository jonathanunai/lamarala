<template>
  <div class="page-container admin-page">
    <transition name="bounce">
      <div v-if="statusChanging" class="status-changing"></div>
    </transition>
    <div v-if="!user" class="login"><form-login /></div>
    <div v-else class="logged-in">
      <div class="admin-header">
        <h3>
          Identificado como: {{ user.user.email }}
          <span class="logout" @click="logout">[desconectar]</span>
        </h3>
        <h1>Zona de adminitración de La Mar Salá</h1>
        <div class="admin-buttons">
          <h4 v-if="show === 'form'">Creando / Editando</h4>
          <div v-if="show === 'list'" class="admin-button" @click="showForm">
            Crear nuevo
          </div>
        </div>
      </div>
      <div class="container-admin">
        <transition name="bounce" mode="out-in">
          <form-new
            v-if="show === 'form'"
            key="form"
            :item="item"
            @cancel="showList"
            @added="added"
          />
          <div v-else class="lists">
            <div
              class="list"
              v-for="(cartaItem, id) in carta"
              :key="id"
              :value="id"
            >
              <h2>{{ id === 'Arroz' ? 'Arroces' : id + 's' }}</h2>
              <ul key="list">
                <li
                  v-for="(menuItem, id) in cartaItem"
                  :key="id"
                  :value="menuItem.nombre"
                >
                  <div class="flex-row">
                    <div class="active-button">
                      <span
                        :class="
                          menuItem.isActive === 0 ? 'not-active' : 'is-active'
                        "
                        @click="changeItemStatus(menuItem)"
                      ></span>
                    </div>
                    <div class="row-info">
                      <span class="strong">{{ menuItem.nombre }}</span>
                      {{ menuItem.desc }} {{ menuItem.tipovino }}
                      {{ menuItem.zona }} ({{ menuItem.precio }}
                      eur)
                    </div>
                    <div class="row-actions">
                      <div class="del" @click="editItem(menuItem)">[edit]</div>
                      <div class="del" @click="confirmDeleteItem(menuItem)">
                        [del]
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <div v-if="confirm" class="confirm-wrapper">
        <div class="confirm">
          ¿Seguro que quieres borrar {{ item.nombre }}?
          <div class="flex">
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
      menu: [],
      show: 'list',
      confirm: false,
      item: null,
      statusChanging: false,
      carta: {
        Entrada: [],
        Marisco: [],
        Pescado: [],
        Arroz: [],
        Carne: [],
        Postre: [],
        Vino: [],
      },
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    orderedMenu() {
      const temp = this.menu
      return temp.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      )
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.carta = {
        Entrada: [],
        Marisco: [],
        Pescado: [],
        Arroz: [],
        Carne: [],
        Postre: [],
        Vino: [],
      }
      this.$firebase
        .firestore()
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            // this.menu.push({ id: doc.id, ...doc.data() })

            if (
              Object.prototype.hasOwnProperty.call(this.carta, doc.data().tipo)
            )
              this.carta[doc.data().tipo].push({ id: doc.id, ...doc.data() })
          })
        })
    },
    changeItemStatus(item) {
      console.log(item)
      item.isActive = item.isActive !== 0 ? 0 : 1
      this.statusChanging = true
      this.$firebase
        .firestore()
        .collection('Menu')
        .doc(item.id)
        .update({
          isActive: item.isActive,
        })
        .then(() => (this.statusChanging = false))
    },
    showForm() {
      this.show = 'form'
      this.$store.dispatch('setEditItem', false)
    },
    added() {
      this.show = 'list'
      this.loadData()
    },
    showList() {
      this.show = 'list'
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
  > * {
  }
  .logout {
    cursor: pointer;
  }
}
.admin-page {
  h2 {
    padding: 16px 0;
    margin: 24px auto 16px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
  }
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
  padding: 32px 0;
  display: flex;
  text-align: center;
  flex-direction: column;
  h3 {
    color: $colorLight;
    padding-bottom: 10px;
    font-size: 0.75rem;
    position: absolute;
    right: 16px;
    top: 8px;
  }
}
.admin-buttons {
  margin: 12px 0;
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
    box-shadow: 0 0.75rem 0.5rem -0.5rem hsl(0 50% 80%);
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
</style>
