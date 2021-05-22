<template lang="pug">
#main
  SearchBar
  WeatherCard
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          onGeolocationSuccess,
          onGeolocationError
        )
      }
    })

    async function onGeolocationSuccess(position: GeolocationPosition) {
      await Promise.all([
        store.dispatch('getWeatherDataByGeolocation', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }),

        store.dispatch('getWeatherForecast', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }),
      ])
    }

    async function onGeolocationError(error: GeolocationPositionError) {
      if (error.PERMISSION_DENIED) {
        window.alert('Unable to obtain geolocation')
      }
      await store.dispatch('getWeatherData', 'Kuala Lumpur')
    }
  },
})
</script>

<style lang="sass">
#main
  width: 100vw
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>
