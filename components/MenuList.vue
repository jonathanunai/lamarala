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
            <li
              v-if="item[a] === true"
              :key="a"
              @click="store.toggleAlergicModal()"
            >
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

<script setup>
import { computed } from 'vue'
import { useAppStore } from '~/stores/app'

const props = defineProps({
  menu: { type: Array, default: null },
  order: { type: String, default: null },
})

const store = useAppStore()

const alergenics = [
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
]

const lang = computed(() => store.activeLanguage)

const orderedMenu = computed(() => {
  if (!props.menu) return []
  if (props.order === 'no') return props.menu
  return Array.isArray(props.menu)
    ? [...props.menu].sort((a, b) =>
        parseInt(a.orden) > parseInt(b.orden) ? 1 : -1,
      )
    : []
})
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
    padding-top: 2px;
    opacity: 0.7;
    li {
      padding: 0;
      margin: 0;
    }
    img {
      width: 14px;
      margin-right: 6px;
      cursor: pointer;
    }
  }
}
</style>
