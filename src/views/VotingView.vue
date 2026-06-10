<template>
  <div class="page">
    <div v-if="store.loading" class="loading">
      <div class="loading__spinner"></div>
      <p class="loading__text">Carregando enquete...</p>
    </div>

    <div v-else-if="store.error" class="error-state">
      <p class="error-state__message">{{ store.error }}</p>
      <button class="btn btn--secondary" @click="store.fetchPoll()">Tentar novamente</button>
    </div>

    <template v-else-if="store.poll">
      <Transition name="toast">
        <div v-if="showSuccess" class="success-toast" role="alert">
          <span class="success-toast__icon" aria-hidden="true">✓</span>
          Voto registrado com sucesso!
        </div>
      </Transition>

      <PollCard :title="store.poll.title" :description="store.poll.description">
        <div role="radiogroup" :aria-label="store.poll.title" class="options-list">
          <VoteOption
            v-for="option in store.poll.options"
            :key="option.id"
            :option="option"
            :is-selected="selectedOption === option.id"
            :disabled="store.submitting || showSuccess"
            @select="selectedOption = $event"
          />
        </div>

        <template #footer>
          <p v-if="!selectedOption" class="vote-hint">
            Selecione uma opção para continuar
          </p>
          <button
            class="btn btn--primary"
            :disabled="!selectedOption || store.submitting || showSuccess"
            @click="handleVote"
          >
            <span v-if="store.submitting" class="btn__spinner" aria-hidden="true"></span>
            {{ store.submitting ? 'Enviando...' : 'Votar' }}
          </button>
        </template>
      </PollCard>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePollStore } from '@/stores/pollStore'
import PollCard from '@/components/PollCard.vue'
import VoteOption from '@/components/VoteOption.vue'

const router = useRouter()
const store = usePollStore()
const selectedOption = ref(null)
const showSuccess = ref(false)

onMounted(() => store.fetchPoll())

async function handleVote() {
  if (!selectedOption.value) return
  try {
    await store.submitVote(selectedOption.value)
    showSuccess.value = true
    setTimeout(() => router.push({ name: 'results' }), 1400)
  } catch {
    // error displayed via store.error
  }
}
</script>

<style scoped>
.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vote-hint {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.success-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-success);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgb(5 150 105 / 0.35);
  z-index: 100;
  white-space: nowrap;
}

.success-toast__icon {
  font-size: 1rem;
  font-weight: 700;
}

.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  transition: all 0.25s ease-in;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-16px) scale(0.9);
}
</style>
