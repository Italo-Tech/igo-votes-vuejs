<template>
  <div class="result-item" :class="{ 'result-item--winner': isWinner }">
    <div class="result-item__header">
      <div class="result-item__label-group">
        <span v-if="isWinner" class="result-item__badge">1º</span>
        <span class="result-item__label">{{ result.label }}</span>
      </div>
      <div class="result-item__stats">
        <span class="result-item__votes">
          {{ result.votes }} voto{{ result.votes !== 1 ? 's' : '' }}
        </span>
        <span class="result-item__percentage">{{ result.percentage }}%</span>
      </div>
    </div>
    <ProgressBar :percentage="result.percentage" :is-winner="isWinner" />
  </div>
</template>

<script setup>
import ProgressBar from './ProgressBar.vue'

defineProps({
  result: {
    type: Object,
    required: true
  },
  isWinner: {
    type: Boolean,
    default: false
  }
})
</script>
