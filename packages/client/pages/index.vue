<template lang="pug">
#main
  SearchBar
  WeatherCard
</template>

<script>
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            store.dispatch('getWeatherDataByGeolocation', {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            })
          },
          (err) => console.log(err)
        )
      }
    })
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
