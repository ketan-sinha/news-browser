import { createStore } from 'vuex'
import api from '@/services/api'

export default createStore({
  state: {
    search_options: {},
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
    
    setSearchOptions (state, options) {
      state.search_options = options
    }
  },
  actions: {
    fetchNews ({ state, commit }) {
      api
      .request({
        params: {q: state.search_options.query, lang: state.search_options.lang, page_size: 24 }
      })
      .then(response => {
        commit('updateAPIdata', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    setSearchOptions ({ commit }, options) {
      commit('setSearchOptions', options)
    }
  },
  modules: {
  }
})
