<template lang="pug">
#home
  SearchBar
  WeatherCard(:cityId='1760605')
</template>

<script lang="ts">
// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
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
        store.dispatch('getWeatherData', {
          mode: 'geolocation',
          coordinates: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
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
      await store.dispatch('getWeatherData', {
        mode: 'city',
        city: 'Kuala Lumpur',
      })
    }
  },
})
</script>
