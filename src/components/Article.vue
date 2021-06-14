<template>
  <div :class="topicColor('border')" class="overflow-hidden border border-b-4 relative text-left dark:text-gray-200 max-h-96">
    <img :src="media" class="w-full object-cover h-2/6">
    <div class="m-2 h-3/6">
      <div class="h-1/2">
        <div class="mb-1">
          <span :class="topicColor('bg')" class="rounded-full py-0.5 px-2 text-xs text-white">{{ topic }}</span>
        </div>
        <a :href="link" class="hover:underline" target="_blank" rel="noopener noreferrer">
          <h3 :title="title" class="font-semibold leading-tight overflow-ellipsis line-clamp-2">{{ title }}</h3>
        </a>
        <div class="truncate">
          <h4 class="text-xs mt-1"><span class="font-mono">url: </span>{{ clean_url }}</h4>
          <h4 class="text-xs mt-1 overflow-auto" :title="author"><span class="font-mono">author: </span>{{ author }}</h4>
        </div>
      </div>
      <div class="1/2">
        <p class="overflow-scroll text-sm line-clamp-4 mt-6 mb-1">{{ summary }}</p>
      </div>
    </div>
    <div class="mx-2 my-3 pt-2 h-1/6 border-t">
      <svg v-if="twitter_account" xmlns="http://www.w3.org/2000/svg" class="inline" :title="twitter_account" :v-if="twitter_account" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
      </svg>
      <small class="ml-1 align-middle text-xs font-mono text-gray-500 inline"> {{ twitter_account }}</small>
      <span class="inline">{{ published_date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: String,
      required: true
    },
    clean_url: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    twitter_account: {
      type: String,
      required:false,
      default: null
    },
    media: {
      type: String,
      required:false,
      default: null
    },
    language: {
      type: String,
      required: false,
      default: null
    },
    published_date: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    topicColor: function (elem) {
      var colors = {
        'news': "-gray-700",
        'sport': "-green-700",
        'tech': "-blue-700",
        'world': "-blue-500",
        'finance': "-yellow-500",
        'politics': "-purple-700",
        'business': "-yellow-700",
        'economics': "-green-500",
        'entertainment': "-indigo-500",
        'beauty': "-pink-500",
        'gaming': "-red-700",
      }
      if(this.topic in colors) {
        return elem + colors[this.topic]
      }
      else {
        return elem + "-current"
      }
    }
  }
}
</script>