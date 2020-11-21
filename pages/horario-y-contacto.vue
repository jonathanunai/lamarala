<template>
  <div class="container horario-page">
    <div class="icon-wrapper"><horario-icon /></div>

    <div>
      <h4>HORARIO Y CONTACTO</h4>
      HORARIO DE COMIDAS Lunes a sábado: 12,00 a 16,30h. HORARIO DE CENAS
      Viernes y sábado: 20,30 a 23,30h.
    </div>

    <div class="icon-wrapper"><direccion-icon /></div>
    <div>
      <h4>DIRECCIÓN</h4>
      Calle Honda, 9 45003 Toledo (España)
    </div>

    <div class="icon-wrapper"><telefono-icon /></div>
    <div>
      <h4>TELÉFONO</h4>
      +34 925 254 785
    </div>

    <div class="icon-wrapper"><mail-icon /></div>
    <div>
      <h4>EMAIL</h4>
      info@lamarsalatoledo.com
    </div>
    <social-links :column="true" />
    <button-reservar :white="false" />
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
  flex-direction: column;
  color: $colorGrey;
  padding: 24px;
  .icon-wrapper {
    text-align: center;
    padding-top: 16px;
  }
  svg {
    width: 22px;
    height: 22px;
    margin: 8px auto;
  }
}
</style>
