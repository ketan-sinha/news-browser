<template>
  <div class="container mx-auto">
    <div class="">
      <Search @search-news="getNews"/>
    </div>
    <div class="mt-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Article
          v-for="(article, index) in state.APIdata.articles"
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

import { reactive } from 'vue'
import api from '@/services/api'
import Search from '@/components/Search'
import Article from '@/components/Article'

export default {
  name: 'Feed',
  components: { Search, Article },
  setup() {
    const state = reactive ({
      APIdata: []
    })

    function getNews(query) {
      api
        .request({
          params: {q: query, lang: "en", page_size: 24 }
        })
        .then(response => {
          state.APIdata = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    return {
      state,
      getNews
    }
  }
}
</script>