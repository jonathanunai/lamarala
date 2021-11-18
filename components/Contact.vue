<template>
  <div id="horario-y-contacto" class="horario-page">
    <div class="img-wrapper">
      <a
        href="https://www.tripadvisor.es/Restaurant_Review-g187489-d2486849-Reviews-La_Mar_Sala-Toledo_Province_of_Toledo_Castile_La_Mancha.html"
        target="_blank"
      >
        <img src="/img/tripadvisor.png" alt="" class="star" />
      </a>
    </div>

    <div class="icon-wrapper"><horario-icon /></div>

    <div>
      <h4>HORARIO DE COMIDAS</h4>
      <p>Lunes a sábado: 12,00 a 16,30h.</p>
      <h4 class="second">HORARIO DE CENAS</h4>
      <p>Viernes y sábado: 20,30 a 23,30h.</p>
    </div>

    <div class="icon-wrapper"><direccion-icon /></div>
    <div>
      <h4>DIRECCIÓN</h4>
      Calle Honda, 9 <br />45003 Toledo (España)
    </div>

    <div class="icon-wrapper"><telefono-icon /></div>
    <div>
      <h4>TELÉFONO</h4>
      +34 925 254 785
    </div>

    <div class="icon-wrapper"><mail-icon /></div>
    <div>
      <h4>EMAIL</h4>
      <a href="mailto:info@lamarsalatoledo.com">info@lamarsalatoledo.com</a>
    </div>
    <nuxt-link to="/reservas" class="book-button">RESERVAR</nuxt-link>

    <social-links :column="true" />
  </div>
</template>
<script>
import HorarioIcon from '@/assets/svg/horario.svg'
import DireccionIcon from '@/assets/svg/direccion.svg'
import TelefonoIcon from '@/assets/svg/telefono.svg'
import MailIcon from '@/assets/svg/mail.svg'

export default {
  layout: 'temp',
  components: { HorarioIcon, DireccionIcon, TelefonoIcon, MailIcon },
}
</script>

<style lang="scss">
.horario-page {
  color: $colorGrey;
  padding: 24px;
  align-items: unset;
  flex-direction: column;
  text-align: center;
  @include md {
    justify-content: left;
  }
  .right-col {
    display: block;
    position: relative;
    width: 100%;
    left: 0;
    @include md {
      position: fixed;
      width: 50%;
      left: 50%;
    }
  }
  h4.second {
    padding-top: 8px;
  }
  .icon-wrapper {
    text-align: center;
    padding-top: 16px;
  }
  svg {
    width: 22px;
    height: 22px;
    margin: 8px auto;
  }
  a {
    text-decoration: none;
    color: $colorGrey;
  }
  .mapouter {
    position: relative;
    text-align: right;
    height: 774px;
    width: 100%;
  }
  .gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 100vh;
    width: 100vw;
    margin-left: -24px;
    @include md {
      width: 50vw;
      margin: 0;
    }
  }
  .book-button {
    color: $colorGrey;
    border: 1px solid $colorGrey;
    padding: 2px 8px;
    margin: 24px auto 10px;
    text-decoration: none;
    background: #ffffff;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 22px;
    @include md {
      display: none;
    }
  }
}
</style>
