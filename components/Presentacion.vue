<template>
  <div class="home-content">
    <h1>LA MAR SALÁ</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="introWeb"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      renderedText: {
        introWeb:
          '<p>Restaurante de Toledo especializado en Marisco y Pescado Salvaje de máxima calidad. </p><p>La Mar Salá de Toledo es un pequeño, pero hermoso restaurante, situado cerca de la famosa Puerta de Bisagra de Toledo, junto a los juzgados. </p><p>Somos conscientes de que tras una buena cocina debe encontrarse la materia prima más selecta, traída directamente de los mejores lugares de España para usted. Depositamos gran esfuerzo y dedicación en nuestros platos, día tras día, sin ningún tipo de intermediarios. </p><p>Vamos en busca de este maravilloso producto obtenido del mar, para prepararlo después en nuestros fogones exprimiendo al máximo sus cualidades intrínsecas, incluida su frescura y el olor a mar característico. </p><p>En la mesa, encontramos el maridaje perfecto con nuestros vinos, que le harán realzar aún más los maravillosos sabores de los que estamos hablando. Le esperamos pronto en La Mar Salá. </p><p>Estamos a su servicio.</p>',
      },
    }
  },
  computed: {
    introWeb() {
      return this.$store.state.textos.introWeb
        ? this.$store.state.textos.introWeb
        : this.renderedText.introWeb
    },
  },
}
</script>
<style lang="scss">
.home-content {
  padding-top: 90vh;
  padding-bottom: 24px;
  .img-wrapper {
    padding: 24px 0 48px 0;
  }
}
</style>
