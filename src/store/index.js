import { createStore } from 'vuex'
import api from '@/services/api'

export default createStore({
  state: {
    search_query: '',
    APIdata: []
  },
  getters: {
    search_query: state => state.search_query,
    APIdata: state => state.APIdata
  },
  mutations: {
    updateAPIdata (state, data) {
      state.APIdata = data
    },
    
    setSearchQuery (state, query) {
      state.search_query = query
    }
  },
  actions: {
    fetchNews ({ state, commit }) {
      api
      .request({
        params: {q: state.search_query, lang: "en", page_size: 24 }
      })
      .then(response => {
        commit('updateAPIdata', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    setSearchQuery ({ commit }, q) {
      commit('setSearchQuery', q)
    }
  },
  modules: {
  }
})
