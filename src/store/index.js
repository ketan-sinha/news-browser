import { createStore } from 'vuex'
import api from '@/services/api'

export default createStore({
  state: {
    search_options: {},
    APIdata: {},
    loadingStatus: false
  },
  getters: {
    search_options: state => state.search_options,
    APIdata: state => state.APIdata,
    loadingStatus: state => state.loadingStatus
  },
  mutations: {
    updateAPIdata (state, data) {
      state.APIdata = data
    },
    
    setSearchOptions (state, options) {
      state.search_options = options
    },

    loadingStatus(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus
    }
  },
  actions: {
    fetchNews ({ state, commit }) {
      commit('loadingStatus', true)
      api
      .request({
        params: state.search_options
      })
      .then(response => {
        console.log(state.search_options)
        commit('updateAPIdata', response.data)
        commit('loadingStatus', false)
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
