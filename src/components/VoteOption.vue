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

<style scoped>
.vote-option {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  padding: 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    transform var(--transition-fast);
}

.vote-option:hover:not(.vote-option--disabled) {
  border-color: var(--color-border-focus);
  background-color: #fafbff;
  transform: translateY(-1px);
}

.vote-option:focus-visible {
  outline: 3px solid var(--color-border-focus);
  outline-offset: 2px;
}

.vote-option--selected {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.vote-option--selected:hover:not(.vote-option--disabled) {
  border-color: var(--color-primary-hover);
  background-color: #e8ecff;
}

.vote-option--disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.vote-option__radio {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  transition: border-color var(--transition-fast);
  background: white;
}

.vote-option--selected .vote-option__radio {
  border-color: var(--color-primary);
}

.vote-option__radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-primary);
  animation: dot-pop 150ms ease;
}

@keyframes dot-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.vote-option__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.vote-option__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.vote-option--selected .vote-option__label {
  color: var(--color-primary);
}

.vote-option__description {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}
</style>
