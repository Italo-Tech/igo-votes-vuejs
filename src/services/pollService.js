// Dados mocados da enquete
const MOCK_POLL = {
  id: 1,
  title: 'Melhor formato para o próximo evento?',
  description:
    'Ajude-nos a planejar o próximo evento corporativo escolhendo o formato que melhor se adapta às suas necessidades.',
  options: [
    { id: 1, label: 'Online', description: 'Participação remota via plataforma digital' },
    { id: 2, label: 'Híbrido', description: 'Combinação de presencial e remoto' },
    { id: 3, label: 'Presencial', description: 'Evento 100% presencial' }
  ]
}

// Contadores de votos iniciais
const INITIAL_VOTES = { 1: 45, 2: 44, 3: 20 }

// Chaves do localStorage para isolar os dados desta aplicação
const STORAGE_VOTE_KEY = 'igo_poll_vote'
const STORAGE_VOTES_KEY = 'igo_poll_votes'

// Simulação de delay
function delay(ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function loadVotes() {
  const stored = localStorage.getItem(STORAGE_VOTES_KEY)
  return stored ? JSON.parse(stored) : { ...INITIAL_VOTES }
}

function saveVotes(votes) {
  localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(votes))
}

export const pollService = {
  // Retorna uma cópia profunda do MOCK_POLL para evitar mutações acidentais do objeto original
  async getPoll() {
    await delay()
    return { ...MOCK_POLL, options: MOCK_POLL.options.map(o => ({ ...o })) }
  },

  // Incrementa o contador da opção escolhida e registra o voto do usuário
  async submitVote(optionId) {
    await delay(800)
    const votes = loadVotes()
    votes[optionId] = (votes[optionId] || 0) + 1
    saveVotes(votes)
    localStorage.setItem(STORAGE_VOTE_KEY, String(optionId))
    return { success: true, optionId }
  },

  // Mescla as opções do mock com os contadores persistidos para montar o resultado
  async getResults() {
    await delay()
    const votes = loadVotes()
    return MOCK_POLL.options.map(option => ({
      ...option,
      votes: votes[option.id] || 0
    }))
  },

  // Leitura síncrona, não precisa de delay pois é apenas uma leitura de memória local
  getUserVote() {
    const stored = localStorage.getItem(STORAGE_VOTE_KEY)
    return stored ? Number(stored) : null
  },

  // Remove apenas o voto do usuário; os contadores globais são mantidos intencionalmente
  clearVote() {
    localStorage.removeItem(STORAGE_VOTE_KEY)
  }
}
