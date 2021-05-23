<template lang="pug">
#home
  SearchBar
  v-carousel(hide-delimiters, height='auto')
    v-carousel-item
      WeatherCard(:cityId='$store.state.currentLocationCityId')
    v-carousel-item
      WeatherCard(:cityId='$store.state.currentLocationCityId')
    v-carousel-item
      WeatherCard(:cityId='$store.state.currentLocationCityId')
</template>

<script lang="ts">
// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    onMounted(() => {})
  },
})
</script>
