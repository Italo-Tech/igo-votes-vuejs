import { createRouter, createWebHistory } from 'vue-router'
import VotingView from '@/views/VotingView.vue'
import ResultsView from '@/views/ResultsView.vue'

const routes = [
  {
    path: '/',
    name: 'voting',
    component: VotingView
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
