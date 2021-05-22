<template lang="pug">
#main
  SearchBar
  WeatherCard
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
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
