<template>
  <div>
    <div v-if="error" class="error">Error de autenticacion</div>
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

<script setup>
import { ref } from 'vue'
import { useAppStore } from '~/stores/app'
import { useNuxtApp } from '#app'

const store = useAppStore()
const { $firebase } = useNuxtApp()

const form = ref({ email: null, pass: null })
const error = ref(null)

async function login() {
  error.value = null
  try {
    const data = await $firebase
      .auth()
      .signInWithEmailAndPassword(form.value.email, form.value.pass)
    store.login(data)
    await navigateTo('/adminsala')
  } catch (err) {
    error.value = err.message
  }
}
</script>
