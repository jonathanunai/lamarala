<template>
  <div>
    <div v-if="error" class="error">Error de autenticacion: {{ error }}</div>
    <form action="#">
      <input
        v-model="form.email"
        name="email"
        autofocus
        type="email"
        placeholder="Correo electrónico"
      />
      <input v-model="form.pass" type="password" placeholder="Contraseña" />
      <input type="submit" value="Login" @click.prevent="login" />
    </form>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      form: {
        email: null,
        pass: null,
      },
      error: false,
      authenticatedUser: '',
    }
  },
  created() {
    firebase
      .auth()
      .onAuthStateChanged((user) => (this.authenticatedUser = user))
  },

  methods: {
    login() {
      this.error = null
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.pass)
        .catch((err) => {
          this.error = err.message
        })
        .then((data) => {
          this.$store.dispatch('login', data)
        })
    },
    logout() {
      firebase.auth().signOut()
    },
  },
}
</script>
