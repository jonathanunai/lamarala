<template>
  <div class="container horario-page">
    <div class="left-col">
      <logo :header="true" class="hide-on-small" />

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
      <social-links :column="true" />
      <button-reservar :white="false" />
    </div>
    <div class="right-col">
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=la%20mar%20sala%2C%20toledo&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe
          ><a href="https://embedgooglemap.net/131/"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HorarioIcon from '@/assets/svg/horario.svg'
import DireccionIcon from '@/assets/svg/direccion.svg'
import TelefonoIcon from '@/assets/svg/telefono.svg'
import MailIcon from '@/assets/svg/mail.svg'

export default {
  components: { HorarioIcon, DireccionIcon, TelefonoIcon, MailIcon },
}
</script>
<style lang="scss">
.horario-page {
  color: $colorGrey;
  padding: 24px;
  align-items: unset;
  flex-direction: column;

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
}
</style>
