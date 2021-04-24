<template>
  <div class="absolute top-0 ml-4 my-1 text-xs">
    browser for the <a class="text-blue-700 underline" href="https://free-docs.newscatcherapi.com/">Newscatcher API</a> | built by ketan sinha | <a class="text-blue-700 underline" href="https://github.com/ketan-sinha/news-browser">github</a>
  </div>
  <h1 class="text-3xl font-semibold -mt-8 mb-2 font-mono">newscatcherapi browser</h1>
  <Feed/>
</template>

<script>
import Feed from './components/Feed.vue'

export default {
  name: 'App',
  components: {
    Feed
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
