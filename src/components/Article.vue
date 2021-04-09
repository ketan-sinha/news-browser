<template>
  <!-- <div class="max-w-xl w-full">
    <div class="rounded-2xl border h-full" >
      <div class="h-1/2 z-0">
        <img class="rounded-t-2xl z-0 h-auto align-middle object-contain mix-blend-exclusion" :src="media">
      </div>
      <div class="h-1/2 rounded-b-2xl w-full z-10" :class="getTopic">
        <div class="text-left">
          <h2>{{ title }}</h2>
          <h3 class="overflow-clip text-xs">{{ author }}</h3>
        </div>
        <div>
          <p class="truncate overflow-ellipsis text-xs">{{ summary}}</p>
        </div>
        <a class="text-center align-text-bottom" :href="link">Link</a>
      </div>
    </div>
  </div> -->
  <div :class="topicColor('border')" class="overflow-hidden border border-b-4 relative text-left max-h-96">
    <img :src="media" class="w-full object-cover h-2/6">
    <div class="m-2 h-3/6">
      <div class="h-1/2">
        <p :class="topicColor('text')" class="font-semibold text-xs mb-1">{{ topic }}</p>
        <a :href="link" class="hover:underline" target="_blank" rel="noopener noreferrer">
          <h3 :title="title" class="font-semibold leading-tight overflow-ellipsis line-clamp-2">{{ title }}</h3>
        </a>
        <div class="truncate">
          <h4 class="inline text-sm mt-1 italic">{{ clean_url }} &#183; </h4>
          <h4 class="inline text-sm mt-1 italic">{{ author }}</h4>
        </div>
      </div>
      <div class="h-1/2 border-t">
        <p class="overflow-scroll text-sm line-clamp-4 my-3">{{ summary }}</p>
      </div>
    </div>
    <div class="mx-2 my-3 pt-2 h-1/6 border-t">
      <svg xmlns="http://www.w3.org/2000/svg" class="inline" :title="twitter_account" :v-if="twitter_account" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
      </svg>
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