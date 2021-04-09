<template>
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
