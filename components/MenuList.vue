<template>
  <ul class="menu-list">
    <li v-for="item in menu" :key="item.nombre">
      <div class="plato">
        <span>{{ item.nombre }}</span> {{ item.desc }}
      </div>
      <div class="precio">{{ item.precio }}</div>
    </li>
  </ul>
</template>
<script>
export default {
  // eslint-disable-next-line
  props: ['menu'],
}
</script>
<style lang="scss">
.menu-list {
  padding: 0;
  margin: 0;
  li {
    list-style-type: none;
    padding: 0;
    padding-bottom: 16px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    color: $colorGrey;
    font-size: 0.9rem;

    font-weight: 400;
    @include md {
      font-size: 1rem;
    }
  }
  .plato {
    text-align: left;
    max-width: 70%;
    span {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  .precio {
    font-weight: bold;
  }
}
</style>
