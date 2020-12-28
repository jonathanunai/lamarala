<template>
  <div class="page-container">
    <div class="container home-container">
      <div class="home-img">
        <logo class="hide-on-large" />
        <button-reservar class="hide-on-large" />
      </div>
      <div class="home-content">
        <logo class="hide-on-small" />
        <star class="hide-on-large" />
        <h1>LA MAR SALÁ</h1>
        <p>
          Restaurante de Toledo especializado en Marisco y Pescado Salvaje de
          máxima calidad.
        </p>
        <p>
          La Mar Salá de Toledo es un pequeño, pero hermoso restaurante, situado
          cerca de la famosa Puerta de Bisagra de Toledo, junto a los juzgados.
        </p>
        <p>
          Somos conscientes de que tras una buena cocina debe encontrarse la
          materia prima más selecta, traída directamente de los mejores lugares
          de España para usted.
        </p>
        <p>
          Depositamos gran esfuerzo y dedicación en nuestros platos, día tras
          día, sin ningún tipo de intermediarios. Vamos en busca de este
          maravilloso producto obtenido del mar, para prepararlo después en
          nuestros fogones exprimiendo al máximo sus cualidades intrínsecas,
          incluida su frescura y el olor a mar característico.
        </p>
        <p>
          En la mesa, encontramos el maridaje perfecto con nuestros vinos, que
          le harán realzar aún más los maravillosos sabores de los que estamos
          hablando.
        </p>
        <p>Le esperamos pronto en La Mar Salá. Estamos a su servicio.</p>
        <div class="img-wrapper">
          <img src="/img/tripadvisor.png" alt="" class="star" />
        </div>
      </div>
    </div>
    <nuestras-especialidades />
  </div>
</template>

<style lang="scss">
.home-container {
  flex-direction: column;
  align-items: unset;
  @include md {
    flex-direction: row-reverse;
    > div {
      width: 50%;
    }
  }
}
.home-img {
  height: 100vh;
  width: 100%;
  background: url('/img/Pez-mantequilla.jpg');
  background-size: cover;
  background-position: center;
}
.home-content {
  text-align: left;
  margin: 8px 24px;
  margin-bottom: 24px;
  h1 {
    font-size: 1rem;
    letter-spacing: 0.22rem;
    text-transform: uppercase;
    color: $colorTurq;
    padding-bottom: 16px;
  }
  p {
    padding-bottom: 16px;
    font-size: 0.98rem;
    color: $colorGrey;
  }
}
</style>
