<template>
  <div class="w-full">
    <div class="sticky top-0 bg-white border-b w-full z-50 py-4">
      <Search @search-news="getNews"/>
    </div>
    <div v-if="search_options.q" class="w-full container mx-auto mt-6">
      <h2 class="text-2xl text-gray-500 mt-2 text-left">{{ APIdata.total_hits }} results for "{{ search_options.q }}"</h2>
    </div>
    <div class="mt-6 container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Article
          v-for="(article, index) in APIdata.articles"
          :key="index"
          :title="article.title"
          :author="article.author"
          :link="article.link"
          :clean_url="article.clean_url"
          :topic="article.topic"
          :summary="article.summary"
          :twitter_account="article.twitter_account"
          :media="article.media"
        />
      </div>
    </div>
  </div>
</template>
<script>

import { computed } from 'vue'
import { useStore } from 'vuex'
import Search from '@/components/Search'
import Article from '@/components/Article'

export default {
  name: 'Feed',
  components: { Search, Article },
  setup() {
    const store = useStore()

    function paginate () {
      let total_pages = store.getters.APIdata.total_pages
      console.log(total_pages)
    }

    return {
      paginate,
      APIdata: computed(() => store.getters.APIdata),
      search_options: computed(() => store.getters.search_options),
      getNews: () => store.dispatch('fetchNews')
    }
  },
}
</script>