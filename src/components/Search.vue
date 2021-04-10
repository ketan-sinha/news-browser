<template>
  <div class="w-full mx-6">
    <form v-on:submit.prevent="submitSearch">
      <input class="w-full appearance-none border-2 border-gray-400 focus:border-black max-w-sm md:max-w-3xl xl:max-w-6xl h-12 rounded-full px-4" type="text" v-model="state.query" placeholder="Search articles..."/>
    </form>
  </div>
</template>

<script>

import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Search',
  setup(props, context) {
    const state = reactive ({
      query: ''
    })

    const store = useStore()

    function submitSearch() {
      if (state.query) {
        store.dispatch('setSearchQuery', state.query)
        context.emit('search-news');
        state.query = '';
      }
    }

    return {
      state,
      submitSearch
    }
  }
}
</script>