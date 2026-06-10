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

<style scoped>
.result-item {
  padding: 16px;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-border);
  background: #fafafa;
  transition: border-color var(--transition-base);
}

.result-item--winner {
  border-color: var(--color-winner);
  background-color: var(--color-winner-light);
}

.result-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
}

.result-item__label-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.result-item__badge {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  background-color: var(--color-winner);
  border-radius: var(--radius-full);
  padding: 2px 8px;
}

.result-item__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-item__stats {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.result-item__votes {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}

.result-item__percentage {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  min-width: 40px;
  text-align: right;
}

.result-item--winner .result-item__percentage {
  color: var(--color-winner);
}

@media (max-width: 600px) {
  .result-item__stats {
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }
}
</style>
