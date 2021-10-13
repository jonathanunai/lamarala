<template>
  <div>
    <h2>Menú degustación</h2>
    <p>
      Disfrute de nuestro menú degustación de Navidad. Estará disponible del 2
      de Diciembre hasta el 6 de Enero, ambos inclusive.
    </p>
    <p>El menú se servirá a mesa completa (todos los comensales).</p>
    <menu-list :menu="degustacion" />
    <p>Todo por 45€ (iva incluido)</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      degustacion: [
        { nombre: 'Crema castellana', desc: 'con torreznitos de Soria' },
        {
          nombre: 'SARDINA AHUMADA',
          desc: 'sobre quinoa y salmorejo, microensalada con vinagreta de maracuyá y helado de green juice.',
        },
        { nombre: 'ALCACHOFA A LA PLANCHA', desc: 'sobre crema de changurro.' },
        {
          nombre: 'TARTAR DE ATÚN ROJO',
          desc: 'salvaje de almadraba con helado de wasabi.',
        },
        { nombre: 'GAMBA', desc: 'cristal frita con mahonesa de piparras.' },
        {
          nombre: 'SOLOMILLO DE TERNERA',
          desc: 'a la plancha y su guiso de patatas.',
        },
        {
          nombre: 'Postre',
          desc: 'Trufa fluida de chocolate negro sobre crema de zumo de naranja natural y té helado.',
        },
      ],
    }
  },
}
</script>
