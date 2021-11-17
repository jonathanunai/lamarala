<template>
  <ul key="list">
    <li v-for="(menuItem, i) in list" :key="i" :value="menuItem.nombre">
      <div class="flex-row">
        <div class="active-button">
          <span
            :class="menuItem.isActive === 0 ? 'not-active' : 'is-active'"
            @click="$emit('changeItemStatus', menuItem)"
          ></span>
        </div>
        <div class="row-info">
          <span class="strong">{{ menuItem.nombre }}</span>
          {{ menuItem.desc }}
          <span class="yellow">{{ menuItem.zona }}</span>
          <span v-if="menuItem.precio"> ({{ menuItem.precio }} eur)</span>
          <span v-else class="yellow"> Posición: {{ menuItem.orden }}</span>
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
  props: ['list'],
}
</script>
