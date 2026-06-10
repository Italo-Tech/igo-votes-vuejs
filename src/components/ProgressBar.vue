<template>
  <div class="progress-bar" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100">
    <div
      class="progress-bar__fill"
      :class="{ 'progress-bar__fill--winner': isWinner }"
      :style="{ width: `${percentage}%` }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  isWinner: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  animation: bar-grow 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.progress-bar__fill--winner {
  background-color: var(--color-winner);
}

@keyframes bar-grow {
  from { width: 0 !important; }
}
</style>
