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
