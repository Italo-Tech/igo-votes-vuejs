import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pollService } from '@/services/pollService'

export const usePollStore = defineStore('poll', () => {
  // Estado reativo compartilhado entre todos os componentes que usarem esta store
  const poll = ref(null)       // dados da enquete (título, opções...)
  const results = ref([])      // opções enriquecidas com contagem de votos
  const userVote = ref(null)   // id da opção que o usuário escolheu
  const loading = ref(false)   // controla exibição do spinner de carregamento
  const submitting = ref(false) // controla estado do botão "Votar" durante o envio
  const error = ref(null)      // mensagem de erro exibida na interface

  // Soma todos os votos — recalcula automaticamente sempre que results mudar
  const totalVotes = computed(() =>
    results.value.reduce((sum, option) => sum + option.votes, 0)
  )

  // Adiciona o campo percentage a cada opção; evita divisão por zero quando não há votos
  const resultsWithPercentage = computed(() => {
    const total = totalVotes.value
    return results.value.map(option => ({
      ...option,
      percentage: total > 0 ? Math.round((option.votes / total) * 100) : 0
    }))
  })

  // Atalho booleano para saber se o usuário já participou desta enquete
  const hasVoted = computed(() => userVote.value !== null)

  // Carrega os dados da enquete e recupera o voto persistido do usuário
  async function fetchPoll() {
    loading.value = true
    error.value = null
    try {
      poll.value = await pollService.getPoll()
      userVote.value = pollService.getUserVote()
    } catch {
      error.value = 'Erro ao carregar a enquete. Tente novamente.'
    } finally {
      // finally garante que loading sempre volta para false, mesmo em caso de erro
      loading.value = false
    }
  }

  // Carrega os contadores de votos para exibição na tela de resultados
  async function fetchResults() {
    loading.value = true
    error.value = null
    try {
      results.value = await pollService.getResults()
    } catch {
      error.value = 'Erro ao carregar os resultados. Tente novamente.'
    } finally {
      loading.value = false
    }
  }

  // Envia o voto; usa submitting (não loading) para não esconder o formulário durante o envio
  async function submitVote(optionId) {
    submitting.value = true
    error.value = null
    try {
      await pollService.submitVote(optionId)
      userVote.value = optionId
    } catch {
      error.value = 'Erro ao enviar o voto. Tente novamente.'
      // Re-lança para que a view possa reagir (ex: não exibir o toast de sucesso)
      throw new Error('Vote submission failed')
    } finally {
      submitting.value = false
    }
  }

  // Limpa apenas o voto do usuário; os contadores globais permanecem no localStorage
  function resetVote() {
    pollService.clearVote()
    userVote.value = null
    results.value = [] // força nova busca ao retornar para a tela de resultados
  }

  return {
    poll,
    results,
    userVote,
    loading,
    submitting,
    error,
    totalVotes,
    resultsWithPercentage,
    hasVoted,
    fetchPoll,
    fetchResults,
    submitVote,
    resetVote
  }
})
