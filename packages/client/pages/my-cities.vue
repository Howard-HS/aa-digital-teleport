<template lang="pug">
#my-cities
  v-row
    v-col.text-center
      v-btn.mx-2(icon, @click='slides--')
        v-icon(large) mdi-chevron-left
      v-btn.mx-2(icon, @click='slides++')
        v-icon(large) mdi-chevron-right
  v-carousel(
    hide-delimiters,
    height='auto',
    :show-arrows='false',
    v-model='slides'
  )
    template(v-for='city in savedCities')
      v-carousel-item(:key='city.id')
        WeatherCard(:city='city')
</template>

<script lang="ts">
// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import {
  defineComponent,
  onMounted,
  useContext,
  ref,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    const slides = ref(0)
    const storageKey = `${window.location.host}|userCities`

    const defaultSavedCities = ['Kuala Lumpur', 'Johor Bahru', 'George Town']
    const savedCities = computed(() => store.getters.getCities)

    onMounted(async () => {
      // Check if users have any saved cities
      const savedCities = JSON.parse(localStorage.getItem(storageKey))

      if (!savedCities || savedCities.length <= 0) {
        await initializeCities(defaultSavedCities)
      }

      await initializeCities(savedCities)
    })

    async function initializeCities(cities: string[]) {
      if (!cities || cities.length <= 0) {
        return
      }

      for (let i = 0; i < cities.length; i++) {
        await store.dispatch('getWeatherData', {
          mode: 'city',
          city: cities[i],
        })
        store.commit('addCity', store.getters.getCurrentCity)
      }

      localStorage.setItem(storageKey, JSON.stringify(cities))
    }

    return { slides, savedCities }
  },
})
</script>
