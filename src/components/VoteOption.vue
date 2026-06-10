<template>
  <button
    class="vote-option"
    :class="{
      'vote-option--selected': isSelected,
      'vote-option--disabled': disabled
    }"
    :disabled="disabled"
    role="radio"
    :aria-checked="isSelected"
    @click="$emit('select', option.id)"
  >
    <span class="vote-option__radio">
      <span v-if="isSelected" class="vote-option__radio-dot"></span>
    </span>
    <span class="vote-option__content">
      <span class="vote-option__label">{{ option.label }}</span>
      <span v-if="option.description" class="vote-option__description">
        {{ option.description }}
      </span>
    </span>
  </button>
</template>

<script setup>
defineProps({
  option: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<style src="@/assets/styles/components/VoteOption.css"></style>
