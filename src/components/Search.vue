<template>
	<div class="w-full md:mx-6">
		<form v-on:submit.prevent="submitSearch" action=".">
			<input v-model.lazy="options.q" class="w-full appearance-none border-2 inline border-transparent bg-gray-200 dark:bg-gray-900 text-black dark:text-white focus:border-black max-w-sm md:max-w-3xl xl:max-w-6xl h-12 rounded-full px-4" name="search" type="search" placeholder="Search articles..."/>
		</form>
		<div class="mt-2 my-auto">
			<button @click="filterHidden = !filterHidden" title="Filters">
				<svg v-if="filterHidden" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
				<svg v-if="!filterHidden" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				</svg>
			</button>
		</div>
	</div>
	<transition name="slide-fade">
		<div v-if="!filterHidden" class="w-full text-center md:mx-6 pb-4 md:mb-3 z-0">
			<div class="block md:inline md:ml-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline stroke-current text-black dark:text-white" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
				</svg>
				<select class="inline w-full max-w-xs md:max-w-max md:w-auto border-transparent bg-gray-200 dark:bg-gray-900 text-black dark:text-white text-sm p-2 ml-1 md:ml-2 rounded-full" v-model="options.lang">
					<option disabled value="">Language</option>
					<option class="text-sm" v-for="option in lang_options" :key="option" :value="option.value">
						[{{ option.value }}] {{ option.text }} 
					</option>
				</select>
			</div>
			<div class="block md:inline mt-2 md:mt-0 md:ml-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline stroke-current text-black dark:text-white" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
					<path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
				</svg>
				<select class="inline w-full max-w-xs md:max-w-max md:w-auto border-transparent bg-gray-200 dark:bg-gray-900 text-black dark:text-white text-sm p-2 ml-1 md:ml-2 rounded-full" v-model="options.topic">
					<option disabled value="">Topic</option>
					<option class="text-sm" v-for="topic in topic_options" :key="topic" :value="topic">
						{{ topic }} 
					</option>
				</select>
			</div>
			<div class="block md:inline mt-2 md:mt-0 md:ml-6">
				<div class="block md:inline">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline stroke-current text-black dark:text-white" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
					</svg>
					<input v-model="options.from" class="inline w-full max-w-xs md:max-w-max md:w-auto border-transparent bg-gray-200 dark:bg-gray-900 text-black dark:text-white text-sm p-2 ml-1 md:ml-2 rounded-full" type="date">
				</div>
				<div class="mt-2 md:mt-0 md:ml-1 md:inline">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline stroke-current text-black dark:text-white" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
					</svg>
					<div class="inline md:ml-1">
						<input v-model="options.to" class="inline w-full max-w-xs md:max-w-max md:w-auto border-transparent bg-gray-200 dark:bg-gray-900 text-black dark:text-white text-sm p-2 ml-1 rounded-full" type="date">
					</div>
				</div>
			</div>
			<div class="inline-block text-left relative align-middle ml-6 mt-2 md:mt-0 w-20">
				<div class="md:absolute bottom-0 left-0">
					<input class="rounded text-blue-600" type="checkbox" checked="true">
					<span class="text-xs ml-1 text-black dark:text-white">Title</span>
				</div>
				<div class="md:absolute left-0">
					<input class="rounded text-blue-600" type="checkbox" checked="true">
					<span class="text-xs ml-1 dark:text-white">Summary</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>

import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'Search',
	emits: ['search-news'],
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

		const topic_options = [
			'news',
			'sport',
			'tech',
			'world',
			'finance',
			'politics',
			'business',
			'economics',
			'entertainment',
			'beauty',
			'gaming'
		]

		const options = reactive ({
			q: '',
			lang: '',
			topic: '',
			from: '',
			to: '',
			page_size: 24
		})
		const filterHidden = ref(true)
		const store = useStore()

		function submitSearch () {
			if (options.q) {
				store.dispatch('setSearchOptions', options)
				context.emit('search-news');
			}
		}

		return {
			filterHidden,
			topic_options,
			lang_options,
			options,
			submitSearch
		}
	}
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>