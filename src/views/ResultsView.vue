<template>
  <div class="page">
    <div v-if="store.loading" class="loading">
      <div class="loading__spinner"></div>
      <p class="loading__text">Carregando resultados...</p>
    </div>

    <div v-else-if="store.error" class="error-state">
      <p class="error-state__message">{{ store.error }}</p>
      <button class="btn btn--secondary" @click="loadData">Tentar novamente</button>
    </div>

    <template v-else>
      <PollCard
        :title="store.poll?.title || 'Resultados da Votação'"
        description="Confira o resultado consolidado da enquete"
      >
        <div class="results-list">
          <ResultItem
            v-for="(result, index) in sortedResults"
            :key="result.id"
            :result="result"
            :is-winner="index === 0 && result.votes > 0"
          />
        </div>

        <template #footer>
          <p class="total-votes">
            Total de votos: <strong>{{ store.totalVotes }}</strong>
          </p>
          <button class="btn btn--secondary" @click="handleVoteAgain">
            Votar novamente
          </button>
        </template>
      </PollCard>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePollStore } from '@/stores/pollStore'
import PollCard from '@/components/PollCard.vue'
import ResultItem from '@/components/ResultItem.vue'

const router = useRouter()
const store = usePollStore()

const sortedResults = computed(() =>
  [...store.resultsWithPercentage].sort((a, b) => b.votes - a.votes)
)

async function loadData() {
  await store.fetchPoll()
  await store.fetchResults()
}

onMounted(loadData)

function handleVoteAgain() {
  store.resetVote()
  router.push({ name: 'voting' })
}
</script>
