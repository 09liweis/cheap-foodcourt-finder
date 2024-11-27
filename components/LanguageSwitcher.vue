<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
    >
      <span>{{ currentLocale.name }}</span>
      <ChevronDownIcon class="h-4 w-4" :class="{ 'transform rotate-180': isOpen }" />
    </button>

    <div
      v-if="isOpen"
      v-click-outside="() => isOpen = false"
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          :class="{ 'bg-gray-50': locale.code === currentLocale.code }"
        >
          {{ locale.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { vClickOutside } from '@vueuse/components'

const { locale, locales } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => 
  locales.value.find(l => l.code === locale.value)
)

const availableLocales = computed(() => 
  locales.value
)

const switchLanguage = (code) => {
  locale.value = code
  isOpen.value = false
}
</script>