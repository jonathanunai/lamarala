<template>
  <ul class="menu-list">
    <li v-for="(item, k) in orderedMenu" :key="`${item.nombre}${k}`">
      <div class="plato" :class="item.precio ? 'con-precio' : ''">
        <span>{{
          lang === 'en' && item.nombreEn ? item.nombreEn : item.nombre
        }}</span>
        {{ lang === 'en' && item.descEn ? item.descEn : item.desc }}
        <ul class="flex flex-row alergico">
          <template v-for="a in alergenics">
            <li v-if="item[a] === true" :key="a" @click="$emit('showAlergic')">
              <img :src="`/img/icon${a}.png`" :alt="a" class="" />
            </li>
          </template>
        </ul>
      </div>
      <div v-if="item.precio" class="precio">
        {{ item.precio.replace('.', ',') }}
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  // eslint-disable-next-line
  props: ['menu', 'order'],
  data() {
    return {
      alergenics: [
        'Lupin',
        'Celery',
        'Peanut',
        'Mustard',
        'Sesame',
        'Sulfur',
        'Mollusks',
        'Crustacean',
        'Peel',
        'Soy',
        'Fish',
        'Dairy',
        'Egg',
        'Gluten',
      ],
    }
  },
  computed: {
    orderedMenu() {
      if (!this.menu) return []
      if (this.order === 'no') return this.menu
      const temp = this.menu
      return Array.isArray(temp)
        ? temp.sort((a, b) => (parseInt(a.orden) > parseInt(b.orden) ? 1 : -1))
        : []
    },
    lang() {
      return this.$store.state.activeLanguage
    },
  },
  methods: {
    showAlergic() {
      console.log('showAlergic :>> ')
      this.$emit('showAlergic')
    },
  },
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
    span {
      text-transform: uppercase;
      font-weight: bold;
    }
    &.con-precio {
      max-width: 70%;
    }
  }
  .precio {
    font-weight: bold;
  }
  .alergico {
    li {
      padding: 0;
      margin: 0;
    }
    img {
      width: 18px;
      margin-right: 8px;
    }
  }
}
</style>
