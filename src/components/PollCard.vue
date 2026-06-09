<template>
  <div class="poll-card">
    <div class="poll-card__header">
      <h1 class="poll-card__title">{{ title }}</h1>
      <p v-if="description" class="poll-card__description">{{ description }}</p>
    </div>
    <div class="poll-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="poll-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
