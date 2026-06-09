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
