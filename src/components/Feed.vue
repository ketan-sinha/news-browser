<template>
  <div class="w-full">
    <div class="sticky bg-white dark:bg-gray-700 top-0 shadow-md w-full z-40 pt-4">
      <Search @search-news="getNews"/>
    </div>
    <div v-if='loading' class="border border-b-4 border-gray-300 dark:border-gray-700 dark:bg-gray-600 max-w-sm mx-auto mt-12">
      <div class="mt-8 text-xl text-gray-500 dark:text-gray-900 font-mono font-semibold">fetching from API...</div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mt-6 mb-6 animate-bounce mx-auto stroke-current text-gray-400 dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    </div>
    <div v-else>
      <div v-if="search_options.q" class="w-full container mx-1 md:mx-auto mt-6">
        <h2 class="text-lg text-gray-500 mt-2 text-left"><span class="font-semibold">{{ APIdata.total_hits }}</span> results for "<span class="font-semibold">{{ search_options.q }}</span>"</h2>
      </div>
      <div class="mt-6 container mx-auto">
        <div class="grid grid-cols-1 mx-1 md:mx-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      <div v-if="APIdata.status == 'ok'" class="container md:mx-auto relative mt-4 pb-16">
        <div class="inline absolute left-0 ml-2 text-gray-500 text-sm font-mono">
          page <span class="font-semibold">{{ APIdata.page }}</span> of <span class="font-semibold">{{ APIdata.total_pages }}</span>
          <div class="inline ml-4">
            <select v-model="search_options.page" @change="selectPage" class="appearance-none border border-b-4 px-3 md:px-6 dark:bg-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-500 hover:border-gray-500 dark:hover:border-gray-200" title="Go to page">
              <option disabled value="">Page</option>
              <option v-for="page in APIdata.total_pages" :key="page" :value="page" :selected="page == search_options.page">
                {{ page }}
              </option>
            </select>
          </div>
        </div>
        <div class="inline absolute right-0 mr-2 text-gray-500 font-mono text-sm">
          <button :disabled="!hasPrevPage" @click="prevPage" class="px-4 py-2 dark:bg-gray-900 dark:text-gray-200 border border-b-4 border-gray-300 dark:border-gray-500 hover:border-gray-500 dark:hover:border-gray-200 font-semibold">previous</button>
          <button :disabled="!hasNextPage" @click="nextPage" class="px-4 py-2 dark:bg-gray-900 dark:text-gray-200 border border-b-4 border-gray-300 dark:border-gray-500 hover:border-gray-500 dark:hover:border-gray-200 md:ml-4 font-semibold">next</button>
        </div>
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
    const search_options = computed(() => store.getters.search_options)
    const APIdata = computed(() => store.getters.APIdata)
    const loading = computed(() => store.getters.loadingStatus)
    const hasPrevPage = computed(() => (search_options.value.page > 1))
    const hasNextPage = computed(() => (search_options.value.page < APIdata.value.total_pages))

    function prevPage () {
      search_options.value.page = search_options.value.page - 1
      store.dispatch('fetchNews')
    }

    function nextPage () {
      search_options.value.page = search_options.value.page + 1
      store.dispatch('fetchNews')
    }

    function selectPage () {
      store.dispatch('fetchNews')
    }

    function getNews () {
      search_options.value.page = 1
      store.dispatch('fetchNews')
    }

    return {
      selectPage,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      loading,
      APIdata,
      search_options,
      getNews
    }
  },
}
</script>