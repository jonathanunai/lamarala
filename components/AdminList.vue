<template>
  <ul key="list">
    <li v-for="(menuItem, i) in orderedList" :key="i" :value="menuItem.nombre">
      <div class="flex-row">
        <div class="active-button">
          <span
            :class="menuItem.isActive === 0 ? 'not-active' : 'is-active'"
            @click="$emit('changeItemStatus', menuItem)"
          ></span>
        </div>
        <div class="row-info">
          <div>
            <span class="strong">{{ menuItem.nombre }}</span>
            {{ menuItem.desc }}
            <span class="yellow">{{ menuItem.zona }}</span>
            <span v-if="menuItem.precio"> ({{ menuItem.precio }} eur)</span>
            <span v-if="menuItem.orden" class="yellow">
              ({{ menuItem.orden }})</span
            >
          </div>
          <div class="english">
            {{ menuItem.nombreEn }}
            {{ menuItem.descEn }}
          </div>
        </div>
        <div class="row-actions">
          <div class="del" @click="$emit('editItem', menuItem)">[edit]</div>
          <div class="del" @click="$emit('confirmDeleteItem', menuItem)">
            [del]
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['list'],
  computed: {
    orderedList() {
      const temp = this.list
      if (Array.isArray(temp))
        return temp.sort((a, b) => {
          if (b.isActive !== 0 && b.isActive !== 1) b.isActive = 1
          return b.isActive.toString().localeCompare(a.isActive)
        })
      return temp
    },
  },
}
</script>
