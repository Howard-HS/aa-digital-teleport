<template lang="pug">
#home
  WeatherCard(:city='$store.state.currentCity')
  v-dialog(max-width=600, v-model='errorDialog')
    v-card
      v-card-title.error--text Error
      v-card-text Unable to obtain device location, using Kuala Lumpur as default location.
      v-card-actions.justify-end
        v-btn(text, @click='errorDialog = false') Close
</template>

<script lang="ts">
// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import {
  defineComponent,
  onMounted,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    const errorDialog = ref(false)
    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          onGeolocationSuccess,
          onGeolocationError
        )
      }
    })

    async function onGeolocationSuccess(position: GeolocationPosition) {
      await store.dispatch('getWeatherData', {
        mode: 'geolocation',
        coordinates: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
      })
    }

    async function onGeolocationError(error: GeolocationPositionError) {
      if (error.PERMISSION_DENIED) {
        errorDialog.value = true
      }

      await store.dispatch('getWeatherData', {
        mode: 'city',
        city: 'Kuala Lumpur',
      })
    }

    return { errorDialog }
  },
})
</script>
