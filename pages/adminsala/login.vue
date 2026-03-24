<template>
  <div class="login-page">
    <h1>La Mar Salá</h1>
    <form-login />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layer',
  middleware: 'auth',
})
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: $colorGrey;
  color: $colorLight;

  h1 {
    margin-bottom: 2rem;
    letter-spacing: 0.3rem;
  }
}
</style>
