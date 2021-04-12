<template>
  <div class="w-full mx-6">
    <form v-on:submit.prevent="submitSearch">
      <input v-model="options.query" class="w-full appearance-none border-2 border-gray-400 focus:border-black max-w-sm md:max-w-3xl xl:max-w-6xl h-12 rounded-full px-4" type="text" placeholder="Search articles..."/>
      <div class="inline ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="inline align-middle stroke-current" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <circle cx="12" cy="12" r="9" />
          <line x1="3.6" y1="9" x2="20.4" y2="9" />
          <line x1="3.6" y1="15" x2="20.4" y2="15" />
          <path d="M11.5 3a17 17 0 0 0 0 18" />
          <path d="M12.5 3a17 17 0 0 1 0 18" />
        </svg>
        <select class="inline" v-model="options.lang">
          <option disabled value="">Language</option>
          <option class="text-sm" v-for="option in lang_options" :key="option" :value="option.value">
            {{ option.text }} [{{ option.value }}]
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>

import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Search',
  setup(props, context) {
    const lang_options = [
      { text: 'English', value: 'en' },
      { text: 'Afrikaans', value: 'af' },
      { text: 'العربية', value: 'ar' },
      { text: 'български език', value: 'bg'},
      { text: 'বাংলা', value: 'bn' },
      { text: 'català', value: 'ca' },
      { text: '中文', value: 'cn' },
      { text: 'čeština', value: 'cs' },
      { text: 'Cymraeg', value: 'cy' },
      { text: 'dansk', value: 'da' },
      { text: 'Deutsch', value: 'de' },
      { text: 'ελληνικά', value: 'el'},
      { text: 'Español', value: 'es' },
      { text: 'eesti', value: 'et' },
      { text: 'فارسی', value: 'fa' },
      { text: 'suomi', value: 'fi'},
      { text: 'français', value: 'fr' },
      { text: 'ગુજરાતી', value: 'gu' },
      { text: 'עברית', value: 'he' },
      { text: 'हिन्दी', value: 'hi' },
      { text: 'hrvatski jezik', value: 'hr' },
      { text: 'magyar', value: 'hu' },
      { text: 'Bahasa Indonesia', value: 'id' },
      { text: 'Italiano', value: 'it' },
      { text: '日本語 (にほんご)', value: 'ja' },
      { text: 'ಕನ್ನಡ', value: 'kn' },
      { text: '한국어', value: 'ko' },
      { text: 'lietuvių kalba', value: 'lt' },
      { text: 'latviešu valoda', value: 'lv' },
      { text: 'македонски јазик', value: 'mk' },
      { text: 'മലയാളം', value: 'ml' },
      { text: 'मराठी', value: 'mr' },
      { text: 'नेपाली', value: 'ne' },
      { text: 'Nederlands', value: 'nl' },
      { text: 'Norsk', value: 'no' },
      { text: 'ਪੰਜਾਬੀ, پنجابی', value: 'pa' },
      { text: 'język polski', value: 'pl' },
      { text: 'Português', value: 'pt' },
      { text: 'Română', value: 'ro' },
      { text: 'русский', value: 'ru' },
      { text: 'Slovenčina', value: 'sk' },
      { text: 'Slovenski jezik', value: 'sl' },
      { text: 'Soomaaliga', value: 'so' },
      { text: 'Shqip', value: 'sq' },
      { text: 'Svenska', value: 'sv' },
      { text: 'Kiswahili', value: 'sw' },
      { text: 'தமிழ்', value: 'ta' },
      { text: 'తెలుగు', value: 'te' },
      { text: 'ไทย', value: 'th' },
      { text: 'Wikang Tagalog', value: 'tl' },
      { text: 'Türkçe', value: 'tr' },
      { text: 'Twi', value: 'tw' },
      { text: 'Українська', value: 'uk' },
      { text: 'اردو', value: 'ur' },
      { text: 'Tiếng Việt', value: 'vi' }
    ]
    const options = reactive ({
      query: '',
      lang: ''
    })

    const store = useStore()

    function submitSearch() {
      if (options.query) {
        store.dispatch('setSearchOptions', options)
        context.emit('search-news');
        options.query = '';
      }
    }

    return {
      lang_options,
      options,
      submitSearch
    }
  }
}
</script>