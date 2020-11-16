<template>
  <div class="page-container">
    <div v-if="!user" class="login"><form-login /></div>
    <div v-else class="logged-in">
      <div class="admin-header">
        <h3>
          Identificado como: {{ user.user.email }}
          <span class="logout" @click="logout">[desconectar]</span>
        </h3>
        <h2>Zona de adminitración de La Mar Salá</h2>
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

          <ul v-else key="list">
            <li
              v-for="(menuItem, id) in orderedMenu"
              :key="id"
              :value="menuItem.nombre"
            >
              <div class="flex-row">
                <div class="row-info">
                  <span class="strong">{{ menuItem.nombre }}</span>
                  {{ menuItem.desc }} ({{ menuItem.precio }} eur)
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
      this.menu = []

      this.$firebase
        .firestore()
        .collection('Menu')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.menu.push({ id: doc.id, ...doc.data() })
          })
        })
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
