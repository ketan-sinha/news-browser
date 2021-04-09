<template>
  <div class="w-full mx-6 my-4">
    <form v-on:submit.prevent="searchNews">
      <input class="w-full appearance-none focus:border-black max-w-sm md:max-w-xl xl:max-w-5xl h-12 border rounded-full px-4" type="text" v-model="state.query" placeholder="Search articles..."/>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: "Search",
  setup(props, context) {
    const state = reactive ({
      query: ''
    })

    function searchNews() {
      if (state.query) {
        context.emit('search-news', state.query);
        state.query = '';
      }
    }

    return {
      state,
      searchNews
    }
  }
}
</script>